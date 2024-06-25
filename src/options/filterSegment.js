import outputMessages from '../outputMessages/index.js';

/**
 * @param {string[]} cnabLinesArray
 * @param {string} find
 */
export const filterSegment = (cnabLinesArray, find) => {
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
  outputMessages.filterSegment(filteredLines, find);
};
