import { server, rest, lotteriesDB } from 'tests/server';
import { Drawing } from 'types/Drawing';

import {
  getLotteries,
  getLotteriesDrawings,
  getDrawingById
} from 'services/lotteries';

const API_URL = process.env.REACT_APP_API_URL;

describe('Lotteries Service', () => {
  describe('Get Lotteries', () => {
    test('should return all lotteries correctly', async () => {
      const lotteries = await getLotteries();

      expect(lotteries).toStrictEqual(
        lotteriesDB.lotteries.map(({ id, nome }) => ({ id, name: nome }))
      );
    });

    test('should reject with error message when has an error', async () => {
      server.use(
        rest.get(`${API_URL}/loterias`, (_, res) => {
          return res.networkError('Test Error');
        })
      );

      await expect(getLotteries()).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
      );
    });
  });

  describe('Get Lotteries Drawings', () => {
    test('should return all lotteries drawings correctly', async () => {
      const lotteriesDrawings = await getLotteriesDrawings();

      expect(lotteriesDrawings).toStrictEqual(
        lotteriesDB.lotteriesDrawings.map(({ concursoId, loteriaId }) => ({
          lotteryId: loteriaId,
          drawingId: concursoId
        }))
      );
    });

    test('should reject with error message when has an error', async () => {
      server.use(
        rest.get(`${API_URL}/loterias-concursos`, (_, res) => {
          return res.networkError('Test Error');
        })
      );

      await expect(
        getLotteriesDrawings()
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
      );
    });
  });

  describe('Get Drawing by Id', () => {
    test('should return drawing correctly', async () => {
      const drawing = await getDrawingById('200');

      expect(drawing).toStrictEqual({
        id: lotteriesDB.drawing.id,
        lottery: lotteriesDB.drawing.loteria,
        date: lotteriesDB.drawing.data,
        numbers: lotteriesDB.drawing.numeros
      } as Drawing);
    });

    test('should reject with not found error message if get 404 response status', async () => {
      const ID = 10;

      server.use(
        rest.get(`${API_URL}/concursos/${ID}`, (_, res, ctx) => {
          return res.once(ctx.status(404), ctx.json({ message: 'Message' }));
        })
      );

      await expect(
        getDrawingById(ID)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Não possui nenhum concurso para esta loteria no momento."`
      );
    });

    test('should reject with error message when has an error', async () => {
      const ID = 20;

      server.use(
        rest.get(`${API_URL}/concursos/${ID}`, (_, res) => {
          return res.networkError('Test Error');
        })
      );

      await expect(
        getDrawingById(ID)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
      );
    });
  });
});
