import faker from 'faker';

function buildLotteriesDrawing(overrides?: object) {
  return {
    loteriaId: faker.datatype.number(),
    concursoId: faker.datatype.uuid(),
    ...overrides
  };
}

function buildDrawing(overrides?: object) {
  return {
    id: faker.datatype.uuid(),
    loteria: faker.datatype.number(),
    numeros: faker.datatype.array(6),
    data: faker.date.recent().toISOString(),
    ...overrides
  };
}

export { buildLotteriesDrawing, buildDrawing };
