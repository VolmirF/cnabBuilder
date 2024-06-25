'use strict';
import {
  outputMessage,
  outputFilterNameMessage,
  outputFooter,
  outputFilterFindMessage
} from './outputMessage.js';
import { readCNABFile } from './readCNABFile.js';

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

/**
 * @param {number} from
 * @param {number} to
 * @param {'P' | 'Q' | 'R'} segmento
 * @param {string | undefined} filePath
 * @param {string | undefined} companyName
 * @param {string | undefined} find
 */
export const processCLIInput = async (
  from,
  to,
  segmento,
  filePath,
  companyName,
  find
) => {
  const fileData = await readCNABFile(filePath);

  const cnabArray = fileData.split('\n');

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
      R: cnabBodySegmentoR
    },
    company: cnabBodySegmentoQ?.slice(33, 73)
  };

  outputMessage(register, segmento, from, to, cnabLinesArray.length / 3);

  // Filter by find option (search in segments)
  if (find) {
    const filteredLines = [];
    for (let i = 0; i < cnabLinesArray.length; i++) {
      const line = cnabLinesArray[i];
      if (line.includes(find)) {
        const registerNumber = Math.ceil((i + 1) / 3);
        filteredLines.push({
          segment: cnabLinesArray[i],
          company: cnabLinesArray[registerNumber * 3 - 1]?.slice(33, 73),
          line: i + 3
        });
      }
    }
    outputFilterFindMessage(filteredLines, find);
  }

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
            R: cnabLinesArray[i + 1]
          },
          company: cnabLinesArray[i]?.slice(33, 73),
          line: i + 3
        });
      }
    }

    outputFilterNameMessage(filteredLines, companyName);
  }

  outputFooter(cnabLinesArray.length / 3);
};
