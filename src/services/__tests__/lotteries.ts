import { server, rest, lotteriesDB } from 'tests/server';
import { Drawning } from 'types/Drawning';

import {
  getLotteries,
  getLotteriesDrawnings,
  getDrawningById
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

  describe('Get Lotteries Drawnings', () => {
    test('should return all lotteries drawnings correctly', async () => {
      const lotteriesDrawnings = await getLotteriesDrawnings();

      expect(lotteriesDrawnings).toStrictEqual(
        lotteriesDB.lotteriesDrawnings.map(({ concursoId, loteriaId }) => ({
          lotteryId: loteriaId,
          drawningId: concursoId
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
        getLotteriesDrawnings()
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
      );
    });
  });

  describe('Get Drawning by Id', () => {
    test('should return drawning correctly', async () => {
      const drawning = await getDrawningById('200');

      expect(drawning).toStrictEqual({
        id: lotteriesDB.drawning.id,
        lottery: lotteriesDB.drawning.loteria,
        date: lotteriesDB.drawning.data,
        numbers: lotteriesDB.drawning.numeros
      } as Drawning);
    });

    test('should reject with not found error message if get 404 response status', async () => {
      const ID = 10;

      server.use(
        rest.get(`${API_URL}/concursos/${ID}`, (_, res, ctx) => {
          return res.once(ctx.status(404), ctx.json({ message: 'Message' }));
        })
      );

      await expect(
        getDrawningById(ID)
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
        getDrawningById(ID)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
      );
    });
  });
});
