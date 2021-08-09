import React from 'react';

import { Select } from 'components/select';
import { DrawInfo } from 'components/draw-info';
import { WinningNumbers } from 'components/winning-numbers';
import { Footer } from 'components/footer';

import { formatDate } from 'utils/helpers';

import { ReactComponent as Logo } from 'assets/img/logo.svg';

import * as S from './styles';

const LOTTERIES = [
  { id: '1', name: 'Mega-sena' },
  { id: '2', name: 'Quina' },
  { id: '3', name: 'Lotofácil' },
  { id: '4', name: 'Lotomania' },
  { id: '5', name: 'Timemania' },
  { id: '6', name: 'Dia de sorte' }
];

const LOTTERIES_COLORS: Record<string, string> = {
  'mega-sena': '#6BEFA3',
  quina: '#8666EF',
  lotofácil: '#DD7AC6',
  lotomania: '#FFAB64',
  timemania: '#5AAD7D',
  'dia de sorte': '#BFAF83'
};

function Home() {
  const [lottery, setLottery] = React.useState('mega-sena');
  const [isLoading, setIsLoading] = React.useState(false);

  const timeId = React.useRef<NodeJS.Timeout | null>(null);

  function handleLotteryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }

    const { value } = event.currentTarget;

    timeId.current = setTimeout(() => {
      const lottery = LOTTERIES.find((lottery) => lottery.id === value);

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setLottery(lottery?.name.toLowerCase() ?? 'mega-sena');
      }, 1000);
    }, 100);
  }

  React.useEffect(() => {}, [lottery]);

  return (
    <S.Wrapper
      aria-labelledby="#lottery-title"
      style={{ '--bg-color': LOTTERIES_COLORS[lottery] } as React.CSSProperties}
    >
      <S.SideBar hide={isLoading}>
        <Select
          title="Escolha a Loteria"
          id="lotteries"
          onChange={handleLotteryChange}
        >
          {LOTTERIES.map((lottery) => (
            <option key={lottery.id} value={lottery.id}>
              {lottery.name}
            </option>
          ))}
        </Select>

        <S.Title id="lottery-title">
          <Logo aria-hidden={true} />
          <span>{lottery}</span>
        </S.Title>

        <DrawInfo id="4560" date={formatDate('2021-04-20T00:28:09.426Z')} />
      </S.SideBar>

      <S.Body hide={isLoading}>
        <WinningNumbers numbers={['06', '09', '28', '33', '37', '40']} />
        <Footer />
      </S.Body>
    </S.Wrapper>
  );
}

export { Home };
