import outputMessages from '../outputMessages/index.js';

/**
 * @param {string[]} cnabLinesArray
 * @param {string} companyName
 */
export const filterCompanyName = (cnabLinesArray, companyName) => {
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

  outputMessages.filterCompanyName(filteredLines, companyName);
};
