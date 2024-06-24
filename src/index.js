"use strict";
import { outputMessage } from "./outputMessage.js";
import { readCNABFile } from "./readCNABFile.js";

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

/**
 * @param {number} from
 * @param {number} to
 * @param {"P" | "Q" | "R"} segmento
 * @param {string | undefined} filePath
 */
export const processCLIInput = async (from, to, segmento, filePath) => {
  const fileData = await readCNABFile(filePath);

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

  outputMessage(register, segmento, from, to);
};
