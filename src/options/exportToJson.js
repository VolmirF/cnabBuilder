import fs from 'fs/promises';
import path from 'path';
import outputMessages from '../outputMessages/index.js';

/** @param {string[]} cnabLinesArray */
export const exportToJson = async (cnabLinesArray) => {
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

  // TODO: new arg for path output (-o, --output)

  // Filename is cnabMapped.json if not provided
  let pathDir = './out';
  let pathParsed = path.parse(pathDir);
  if (!pathParsed.ext) {
    pathDir += '/cnabMapped.json';
    pathParsed = path.parse(pathDir);
  }

  const pathResolved = path.resolve(pathDir);

  await fs.mkdir(pathParsed.dir, { recursive: true });
  await fs.writeFile(pathResolved, JSON.stringify(mappedJson));

  outputMessages.exportToJson(pathResolved);
};
