'use strict';

import chalk from 'chalk';

/** @param {string} path */
export const exportToJson = (path) => {
  const outputStr = `
----- Cnab exportar para JSON -----
Arquivo exportado com sucesso: ${chalk.inverse.bgBlack(path)}
`;
  console.log(outputStr);
};
