"use strict";
import {
  outputMessage,
  outputFilterNameMessage,
  outputFooter,
} from "./outputMessage.js";
import { readCNABFile } from "./readCNABFile.js";

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

/**
 * @param {number} from
 * @param {number} to
 * @param {"P" | "Q" | "R"} segmento
 * @param {string | undefined} filePath
 * @param {string | undefined} companyName
 */
export const processCLIInput = async (
  from,
  to,
  segmento,
  filePath,
  companyName,
) => {
  const fileData = await readCNABFile(filePath);

  const cnabArray = fileData.split("\n");

  // const cnabHeader = sliceArrayPosition(cnabArray, 0, 2);
  // const cnabTail = sliceArrayPosition(cnabArray, -2);

  // Search position and segment type
  const cnabLinesArray = sliceArrayPosition(cnabArray, 2, -2);

  const [cnabBodySegmentoP, cnabBodySegmentoQ, cnabBodySegmentoR] =
    cnabLinesArray;

  const register = {
    segments: {
      P: cnabBodySegmentoP,
      Q: cnabBodySegmentoQ,
      R: cnabBodySegmentoR,
    },
    company: cnabBodySegmentoQ?.slice(33, 73),
  };

  outputMessage(register, segmento, from, to, cnabLinesArray.length / 3);

  // Filter by name option
  if (companyName) {
    const filteredLines = [];
    for (let i = 1; i < cnabLinesArray.length; i = i + 3) {
      const lineQ = cnabLinesArray[i];
      if (lineQ.slice(33, 73).includes(companyName)) {
        filteredLines.push({
          segments: {
            P: cnabLinesArray[i - 1],
            Q: cnabLinesArray[i],
            R: cnabLinesArray[i + 1],
          },
          company: cnabLinesArray[i]?.slice(33, 73),
          line: i + 3,
        });
      }
    }

    outputFilterNameMessage(filteredLines, companyName);
  }

  outputFooter(cnabLinesArray.length / 3);
};
