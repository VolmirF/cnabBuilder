'use strict';
import yargs from 'yargs';
import { processCLIInput } from './src/index.js';
import chalk from 'chalk';

const optionsYargs = yargs(process.argv.slice(2))
  .usage('Uso: $0 [options]')
  .option('f', {
    alias: 'from',
    describe: 'posição inicial de pesquisa da linha do Cnab',
    type: 'number',
    implies: ['to', 'segmento']
  })
  .option('t', {
    alias: 'to',
    describe: 'posição final de pesquisa da linha do Cnab',
    type: 'number',
    implies: ['from', 'segmento']
  })
  .option('s', {
    alias: 'segmento',
    describe: 'tipo de segmento',
    implies: ['from', 'to'],
    choices: ['p', 'q', 'r'],
    coerce: (value) => value.toLowerCase()
  })
  .option('i', {
    alias: 'find',
    describe: 'texto a ser pesquisado nos segmentos do arquivo',
    type: 'string',
    coerce: (value) => value.toUpperCase()
  })
  .option('n', {
    alias: 'name',
    describe: 'nome da empresa',
    type: 'string',
    coerce: (value) => value.toUpperCase()
  })
  .option('j', {
    alias: 'json',
    describe: 'exportar dados para JSON',
    type: 'boolean'
  })
  .option('o', {
    alias: 'output',
    describe: 'Caminho do arquivo de saída',
    implies: ['json'],
    type: 'string'
  })
  .option('p', {
    alias: 'path',
    describe: 'caminho do arquivo cnab',
    type: 'string'
  })
  .example('$0 -f 21 -t 34 -s p', 'lista a linha e campo from e to do cnab')
  .example('$0 -i 25860', 'busca os segmentos que contem o texto 25860')
  .example(
    '$0 -n NTT',
    'busca as empresas que contem o texto NTT no nome e mostra os segmentos encontrados'
  )
  .example('$0 -j', 'exporta os dados para um arquivo JSON')
  .example(
    '$0 -j -o ../output.json',
    'exporta os dados para um arquivo JSON no caminho e com o nome informado'
  )

  .check((argv) => {
    if (
      !argv.from &&
      !argv.to &&
      !argv.segmento &&
      !argv.name &&
      !argv.find &&
      !argv.json
    ) {
      throw new Error(
        chalk.red(
          'É necessário informar pelo menos uma opção de filtro ou export'
        )
      );
    }
    return true;
  }).argv;

const {
  from,
  to,
  segmento,
  path: filePath,
  name,
  find,
  json,
  output
} = optionsYargs;

const main = async () => {
  try {
    console.time('leitura Async');
    await processCLIInput(
      from,
      to,
      segmento?.toUpperCase(),
      filePath,
      name,
      find,
      json,
      output
    );
    console.timeEnd('leitura Async');
  } catch (error) {
    console.log('Error processing file: ', error);
  }
};

main();
