'use strict';

/** @param {number} registersNumber */
export const outputFooter = (registersNumber) => {
  const footer = `
----------------
total de registros no arquivo: ${registersNumber}

----- FIM ------`;
  console.log(footer);
};
