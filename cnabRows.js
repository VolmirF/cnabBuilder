"use strict";
import path from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

import yargs from "yargs";
import chalk from "chalk";

const optionsYargs = yargs(process.argv.slice(2))
  .usage("Uso: $0 [options]")
  .option("f", {
    alias: "from",
    describe: "posição inicial de pesquisa da linha do Cnab",
    type: "number",
    demandOption: true,
  })
  .option("t", {
    alias: "to",
    describe: "posição final de pesquisa da linha do Cnab",
    type: "number",
    demandOption: true,
  })
  .option("s", {
    alias: "segmento",
    describe: "tipo de segmento",
    type: "string",
    demandOption: true,
    choices: ["p", "q", "r"],
    coerce: (value) => value.toLowerCase(),
  })
  .option("p", {
    alias: "path",
    describe: "caminho do arquivo cnab",
    type: "string",
  })
  .example(
    "$0 -f 21 -t 34 -s p",
    "lista a linha e campo que from e to do cnab",
  ).argv;

const { from, to, path: filePath } = optionsYargs;
const segmento = optionsYargs.segmento.toUpperCase();

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

const messageLog = (register, segmentoType, from, to) => {
  const segmento = register.segments[segmentoType];
  console.log(`
----- Cnab linha ${segmentoType} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha P: 
  ${segmento.substring(0, from)}${chalk.inverse.bgBlack(
    segmento.substring(from - 1, to),
  )}${segmento.substring(to)}

empresa vinculada ao item: ${register.company}

----- FIM ------
`);
};

const main = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const file = path.resolve(filePath || `${__dirname}/cnabExample.rem`);
  if (!filePath) {
    console.log(
      chalk.yellow(
        "Caminho do arquivo cnab não informado. Será utilizado o arquivo padrão cnabExample.rem\n",
      ),
    );
  }

  console.time("leitura Async");
  const fileData = await readFile(file, "utf8").catch((error) => {
    if (error.code === "ENOENT") {
      console.log(chalk.red(`Arquivo ${file} não encontrado`));
    } else {
      console.log("🚀 ~ file: cnabRows.js ~ line 76 ~ error", error.code);
    }
  });

  const cnabArray = fileData.split("\n");

  const cnabHeader = sliceArrayPosition(cnabArray, 0, 2);

  const [cnabBodySegmentoP, cnabBodySegmentoQ, cnabBodySegmentoR] =
    sliceArrayPosition(cnabArray, 2, -2);

  const cnabTail = sliceArrayPosition(cnabArray, -2);

  const register = {
    segments: {
      P: cnabBodySegmentoP,
      Q: cnabBodySegmentoQ,
      R: cnabBodySegmentoR,
    },
    company: cnabBodySegmentoQ.slice(33, 73),
  };

  messageLog(register, segmento, from, to);

  console.timeEnd("leitura Async");
};

main();
