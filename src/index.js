'use strict';
import { readCNABFile } from './readCNABFile.js';
import optionsProcess from './options/index.js';
import outputMessages from './outputMessages/index.js';

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions);

/**
 * @param {number | undefined} from
 * @param {number | undefined} to
 * @param {'P' | 'Q' | 'R' | undefined} segmento
 * @param {string | undefined} filePath
 * @param {string | undefined} companyName
 * @param {string | undefined} find
 * @param {boolean | undefined} jsonExport
 * @param {string | undefined} output
 */
export const processCLIInput = async (
  from,
  to,
  segmento,
  filePath,
  companyName,
  find,
  jsonExport,
  output
) => {
  const fileData = await readCNABFile(filePath);
  const cnabArray = fileData.split('\n');

  // const cnabHeader = sliceArrayPosition(cnabArray, 0, 2);
  // const cnabTail = sliceArrayPosition(cnabArray, -2);
  const cnabLinesArray = sliceArrayPosition(cnabArray, 2, -2);

  if (segmento && from && to)
    optionsProcess.listSegmentTypeSlice(cnabLinesArray, segmento, from, to);
  if (find) optionsProcess.filterSegment(cnabLinesArray, find);
  if (companyName)
    optionsProcess.filterCompanyName(cnabLinesArray, companyName);
  if (jsonExport) await optionsProcess.exportToJson(cnabLinesArray, output);

  outputMessages.outputFooter(cnabLinesArray.length / 3);
};
