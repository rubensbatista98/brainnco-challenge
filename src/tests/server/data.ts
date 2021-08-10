import faker from 'faker';

import { buildDrawing, buildLotteriesDrawing } from 'tests/factories';

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

const LOTTERIES_DRAWINGS = LOTTERIES.map((lottery) =>
  buildLotteriesDrawing({ loteriaId: lottery.id })
);

const lotteriesDB = {
  drawing: buildDrawing(),
  lotteries: LOTTERIES,
  lotteriesDrawings: LOTTERIES_DRAWINGS
};

export { lotteriesDB };
