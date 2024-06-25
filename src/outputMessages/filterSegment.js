'use strict';
import chalk from 'chalk';

/**
 * @param {{
 *   segment: string;
 *   company: string;
 *   line: number;
 * }[]} registers
 * @param {string} companyName
 */
export const filterSegment = (registers, text) => {
  let stringOut = `
----- Cnab busca por texto/segmento: ${text} -----
Total de registros encontrados: ${registers.length} 
`;

  for (const register of registers) {
    stringOut += `
Nome da empresa: ${chalk.inverse.bgBlack(register.company)}
item encontrado na linha ${chalk.inverse.bold.bgBlack(register.line)} - segmento ${register.segment[13]}: 
${register.segment}
`;
  }

  console.log(stringOut);
};
