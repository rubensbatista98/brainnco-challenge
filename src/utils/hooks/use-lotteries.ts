import React from 'react';

import {
  getLotteries,
  getLotteriesDrawings,
  getDrawingById as getDrawing
} from 'services/lotteries';

type Status = 'pending' | 'error' | 'idle';

type Lottery = {
  id: number;
  name: string;
  drawingId: string;
};

type Lotteries = Record<string, Lottery> | null;

function useLotteries() {
  const [status, setStatus] = React.useState<Status>('pending');
  const [lotteries, setLotteries] = React.useState<Lotteries>();
  const [error, setError] = React.useState<string | null>(null);

  const isLoading = status === 'pending';
  const isError = status === 'error';
  const isIdle = status === 'idle';

  React.useEffect(() => {
    setStatus('pending');

    const lotteriesPromise = Promise.all([
      getLotteries(),
      getLotteriesDrawings()
    ]);

    lotteriesPromise
      .then(([lotteries, lotteriesDrawings]) => {
        setStatus('idle');
        setError(null);

        const lotteriesState = lotteries.reduce<NonNullable<Lotteries>>(
          (acc, lottery) => {
            const key = lottery.name;
            const value = {
              id: lottery.id,
              name: lottery.name,
              drawingId: lotteriesDrawings.find(
                (ld) => ld.lotteryId === lottery.id
              )!.drawingId
            };

            acc[key] = value;

            return acc;
          },
          {}
        );

        setLotteries(lotteriesState);
      })
      .catch((error) => {
        setStatus('error');
        setError(error.message);
      });
  }, []);

  const getDrawingById = React.useCallback(async (id: string) => {
    try {
      setStatus('pending');

      const drawing = await getDrawing(id);

      setStatus('idle');

      return drawing;
    } catch (error) {
      setStatus('error');
      setError(error.message);
    }
  }, []);

  return { lotteries, getDrawingById, isLoading, isError, isIdle, error };
}

export type { Lotteries, Lottery };
export { useLotteries };
