"use strict";
import chalk from "chalk";

export const outputMessage = (register, segmentoType, from, to) => {
  const segmento = register.segments[segmentoType];
  console.log(`
----- Cnab linha ${segmentoType} -----

posição from: ${chalk.inverse.bgBlack(from)}

posição to: ${chalk.inverse.bgBlack(to)}

item isolado: ${chalk.inverse.bgBlack(segmento.substring(from - 1, to))}

item dentro da linha P: 
  ${segmento.substring(0, from)}${chalk.inverse.bgBlack(
    segmento.substring(from - 1, to),
  )}${segmento.substring(to)}

empresa vinculada ao item: ${register.company}

----- FIM ------
`);
};
