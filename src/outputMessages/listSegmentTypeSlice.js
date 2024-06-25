'use strict';
import chalk from 'chalk';

export const listSegmentTypeSlice = (
  register,
  segmentoType,
  from,
  to,
  lineFound
) => {
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
