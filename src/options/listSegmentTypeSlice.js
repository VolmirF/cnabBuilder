import outputMessages from '../outputMessages/index.js';

/**
 * @param {string[]} cnabLinesArray
 * @param {'P' | 'Q' | 'R'} segmento
 * @param {number} from
 * @param {number} to
 */
export const listSegmentTypeSlice = (cnabLinesArray, segmento, from, to) => {
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

  outputMessages.listSegmentTypeSlice(
    register,
    segmento,
    from,
    to,
    cnabLinesArray.length / 3
  );
};
