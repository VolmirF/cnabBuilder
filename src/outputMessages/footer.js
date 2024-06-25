'use strict';

export const outputFooter = (registersNumber) => {
  const footer = `
----------------
total de registros no arquivo: ${registersNumber}

----- FIM ------`;
  console.log(footer);
};
