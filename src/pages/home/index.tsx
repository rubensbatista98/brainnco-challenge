import React from 'react';

import { Select } from 'components/select';
import { DrawInfo } from 'components/draw-info';
import { WinningNumbers } from 'components/winning-numbers';
import { WelcomeScreen } from 'components/welcome-screen';
import { ProgressBar } from 'components/progress-bar';
import { Footer } from 'components/footer';

import { formatDate } from 'utils/helpers';
import { useLotteries } from 'utils/hooks';

import type { Lottery } from 'utils/hooks';
import type { Drawing } from 'types/Drawing';

import { ReactComponent as Logo } from 'assets/img/logo.svg';

import * as S from './styles';

const LOTTERIES_COLORS: Record<string, string> = {
  'mega-sena': '#6BEFA3',
  quina: '#8666EF',
  lotofácil: '#DD7AC6',
  lotomania: '#FFAB64',
  timemania: '#5AAD7D',
  'dia de sorte': '#BFAF83'
};

function Home() {
  const [lottery, setLottery] = React.useState<Lottery>();
  const [drawing, setDrawing] = React.useState<Drawing>();

  const { lotteries, getDrawingById, error, ...status } = useLotteries();

  const lotteriesNames = React.useMemo(
    () => (!!lotteries ? Object.keys(lotteries) : []),
    [lotteries]
  );

  const initialLottery = lotteries?.[lotteriesNames[0]];
  const bgColor = !!lottery ? LOTTERIES_COLORS[lottery.name] : null;

  const isLoadingInitialData =
    (!lotteries || (!drawing && !error)) && (status.isLoading || status.isIdle);

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!lotteries) {
      return;
    }

    const { value } = event.currentTarget;
    const lottery = lotteries[value];

    setLottery(lottery);
  }

  React.useEffect(() => {
    if (initialLottery) {
      setLottery(initialLottery);
    }
  }, [initialLottery]);

  React.useEffect(() => {
    if (!lottery) {
      return;
    }

    getDrawingById(lottery.drawingId).then((drawing) => {
      if (drawing) {
        setDrawing(drawing);
      } else {
        setDrawing(undefined);
      }
    });
  }, [lottery, getDrawingById]);

  if (isLoadingInitialData) {
    return <WelcomeScreen />;
  }

  return (
    <S.Wrapper
      aria-labelledby="#lottery-name"
      aria-busy={status.isLoading}
      style={{ '--bg-color': bgColor } as React.CSSProperties}
    >
      <ProgressBar isLoading={status.isLoading} />

      <S.SideBar hide={status.isLoading}>
        <Select
          aria-label="Escolha a Loteria"
          id="lotteries"
          defaultValue={lottery?.name}
          onChange={handleChange}
        >
          {lotteriesNames.map((lotteryName) => (
            <option key={lotteryName} value={lotteryName}>
              {lotteryName}
            </option>
          ))}
        </Select>

        <S.Title id="lottery-name">
          <Logo aria-hidden={true} />
          <span>{lottery!.name}</span>
        </S.Title>

        {!!drawing ? (
          <DrawInfo id={drawing.id} date={formatDate(drawing.date)} />
        ) : null}
      </S.SideBar>

      <S.Body hide={status.isLoading}>
        {!!drawing ? (
          <WinningNumbers numbers={drawing.numbers} aria-live="assertive" />
        ) : (
          <S.Error aria-live="assertive">{error}</S.Error>
        )}

        <Footer />
      </S.Body>
    </S.Wrapper>
  );
}

export { Home };
