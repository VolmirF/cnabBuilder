'use strict';
import chalk from 'chalk';

/**
 * @param {{
 *   segments: {
 *     P: string;
 *     Q: string;
 *     R: string;
 *   };
 *   company: string;
 *   line: number;
 * }[]} registers
 * @param {string} companyName
 */
export const filterCompanyName = (registers, companyName) => {
  let stringOut = `
----- Cnab busca por nome: ${companyName} -----
Total de registros encontrados: ${registers.length} 
 `;

  for (const register of registers) {
    const segmento = register.segments['Q'];

    stringOut += `
Nome da empresa: ${chalk.inverse.bgBlack(register.company)}
item encontrado na linha ${chalk.inverse.bold.bgBlack(register.line)} - segmento Q: 
 ${segmento.substring(0, 33)}${chalk.inverse.bgBlack(
   segmento.substring(33, 73)
 )}${segmento.substring(73)}
`;
  }

  console.log(stringOut);
};
