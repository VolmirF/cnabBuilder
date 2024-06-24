"use strict";
import path from "path";
import { readFile } from "fs/promises";
import chalk from "chalk";

/**
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export const readCNABFile = async (filePath) => {
  const __dirname = path.resolve();

  const file = path.resolve(filePath || `${__dirname}/cnabExample.rem`);
  if (!filePath) {
    console.log(
      chalk.yellow(
        "Caminho do arquivo cnab não informado. Será utilizado o arquivo padrão cnabExample.rem\n",
      ),
    );
  }

  const fileData = await readFile(file, "utf8").catch((error) => {
    if (error.code === "ENOENT") {
      console.log(chalk.red(`Arquivo ${file} não encontrado`));
    } else {
      console.log("🚀 ~ file: cnabRows.js ~ line 76 ~ error", error.code);
    }
    throw error;
  });

  return fileData;
};
