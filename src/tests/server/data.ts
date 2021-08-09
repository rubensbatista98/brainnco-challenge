import faker from 'faker';

import { buildDrawning, buildLotteriesDrawning } from 'tests/factories';

const LOTTERIES = [
  {
    id: faker.datatype.number(),
    nome: 'mega-sena'
  },
  {
    id: faker.datatype.number(),
    nome: 'quina'
  },
  {
    id: faker.datatype.number(),
    nome: 'lotofácil'
  },
  {
    id: faker.datatype.number(),
    nome: 'lotomania'
  },
  {
    id: faker.datatype.number(),
    nome: 'timemania'
  },
  {
    id: faker.datatype.number(),
    nome: 'dia de sorte'
  }
];

const LOTTERIES_DRAWNINGS = LOTTERIES.map((lottery) =>
  buildLotteriesDrawning({ loteriaId: lottery.id })
);

const lotteriesDB = {
  drawning: buildDrawning(),
  lotteries: LOTTERIES,
  lotteriesDrawnings: LOTTERIES_DRAWNINGS
};

export { lotteriesDB };
