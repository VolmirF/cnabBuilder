'use strict';
import chalk from 'chalk';

export const outputMessage = (register, segmentoType, from, to, lineFound) => {
  const segmento = register.segments[segmentoType];
  const stringOut = `
----- Cnab linha ${segmentoType} -----

posição from-to: ${chalk.inverse.bgBlack(from)}-${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha ${segmentoType}: 
  ${segmento.substring(0, from - 1)}${chalk.inverse.bgBlack(
    segmento.substring(from - 1, to)
  )}${segmento.substring(to)}

empresa vinculada ao item: ${register.company}

`;
  console.log(stringOut);
};

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
export const outputFilterNameMessage = (registers, companyName) => {
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

export const outputFooter = (registersNumber) => {
  const footer = `
----------------
total de registros no arquivo: ${registersNumber}

----- FIM ------`;
  console.log(footer);
};
