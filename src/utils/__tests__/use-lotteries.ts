import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { lotteriesDB, server, rest } from 'tests/server';
import type { Drawing } from 'types/Drawing';

import { useLotteries } from 'utils/hooks/use-lotteries';

const API_URL = process.env.REACT_APP_API_URL;

describe('useLotteries', () => {
  test('should return lotteries bonded with drawing id', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLotteries());

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isIdle).toBeFalsy();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isIdle).toBeTruthy();

    const lotteries = lotteriesDB.lotteries.reduce<Record<string, object>>(
      (acc, lottery) => {
        acc[lottery.nome] = {
          id: lottery.id,
          name: lottery.nome,
          drawingId: lotteriesDB.lotteriesDrawings.find(
            (ld) => ld.loteriaId === lottery.id
          )?.concursoId
        };

        return acc;
      },
      {}
    );

    expect(result.current.lotteries).toStrictEqual(lotteries);
  });

  test('should return error when a request fails', async () => {
    server.use(
      rest.get(`${API_URL}/loterias`, (_, res) => {
        return res.networkError('error');
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useLotteries());

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeTruthy();

    expect(result.current.error).toMatchInlineSnapshot(
      `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
    );
  });

  test('should get drawing', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLotteries());

    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();

    let drawing;

    act(() => {
      drawing = result.current.getDrawingById('10');
    });

    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();
    expect(result.current.isIdle).toBeTruthy();

    await expect(drawing).resolves.toStrictEqual({
      id: lotteriesDB.drawing.id,
      lottery: lotteriesDB.drawing.loteria,
      numbers: lotteriesDB.drawing.numeros,
      date: lotteriesDB.drawing.data
    } as Drawing);
  });

  test('should return error when get drawing fails', async () => {
    server.use(
      rest.get(`${API_URL}/concursos/:id`, (_, res) => {
        return res.networkError('error');
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useLotteries());

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.isIdle).toBeTruthy();

    act(() => {
      result.current.getDrawingById('10');
    });

    await waitForNextUpdate();
    expect(result.current.isError).toBeTruthy();

    expect(result.current.error).toMatchInlineSnapshot(
      `"Desculpa, tivemos um erro inesperado. Tente novamente mais tarde."`
    );
  });
});
