'use strict';
import path from 'path';
import {
  outputMessage,
  outputFilterNameMessage,
  outputFooter,
  outputFilterFindMessage
} from './outputMessage.js';
import { readCNABFile } from './readCNABFile.js';
import fs from 'fs/promises';

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

/**
 * @param {number} from
 * @param {number} to
 * @param {'P' | 'Q' | 'R'} segmento
 * @param {string | undefined} filePath
 * @param {string | undefined} companyName
 * @param {string | undefined} find
 * @param {boolean | undefined} jsonExport
 */
export const processCLIInput = async (
  from,
  to,
  segmento,
  filePath,
  companyName,
  find,
  jsonExport
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

  // Export json
  if (jsonExport) {
    const mappedJson = [];
    for (let i = 1; i < cnabLinesArray.length; i = i + 3) {
      const lineQ = cnabLinesArray[i];
      mappedJson.push({
        company: lineQ.slice(33, 73).trim(),
        address: {
          publicPlace: lineQ.slice(73, 113).trim(),
          neighborhood: lineQ.slice(113, 130).trim(),
          zipCode: lineQ.slice(128, 136).trim(),
          city: lineQ.slice(136, 151).trim(),
          state: lineQ.slice(151, 153).trim()
        },
        cnabData: {
          segmentPLine: i + 2,
          segmentQLine: i + 3,
          segmentRLine: i + 4,
          registerNumber: (i - 1) / 3 + 1
        }
      });
    }
    // TODO: Use path from 'path' arg if provided
    // TODO: new arg for path output (-o, --output)
    await fs.mkdir(path.resolve('./out'), { recursive: true });
    await fs.writeFile('./out/cnabMapped.json', JSON.stringify(mappedJson));
  }

  outputFooter(cnabLinesArray.length / 3);
};
