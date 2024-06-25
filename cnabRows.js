'use strict';
import yargs from 'yargs';
import { processCLIInput } from './src/index.js';

const optionsYargs = yargs(process.argv.slice(2))
  .usage('Uso: $0 [options]')
  .option('f', {
    alias: 'from',
    describe: 'posição inicial de pesquisa da linha do Cnab',
    type: 'number',
    demandOption: true
  })
  .option('t', {
    alias: 'to',
    describe: 'posição final de pesquisa da linha do Cnab',
    type: 'number',
    demandOption: true
  })
  .option('s', {
    alias: 'segmento',
    describe: 'tipo de segmento',
    type: 'string',
    demandOption: true,
    choices: ['p', 'q', 'r'],
    coerce: (value) => value.toLowerCase()
  })
  .option('p', {
    alias: 'path',
    describe: 'caminho do arquivo cnab',
    type: 'string'
  })
  .option('n', {
    alias: 'name',
    describe: 'nome da empresa',
    type: 'string',
    coerce: (value) => value.toUpperCase()
  })
  .example('$0 -f 21 -t 34 -s p', 'lista a linha e campo que from e to do cnab')
  .check((argv) => {
    // console.log('argv', argv);
    return true;
  }).argv;

const { from, to, segmento, path: filePath, name } = optionsYargs;

const main = async () => {
  try {
    console.time('leitura Async');
    await processCLIInput(from, to, segmento.toUpperCase(), filePath, name);
    console.timeEnd('leitura Async');
  } catch (error) {
    console.log('Error processing file: ', error);
  }
};

main();
