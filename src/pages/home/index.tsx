import React from 'react';

import { Select } from 'components/select';
import { DrawInfo } from 'components/draw-info';
import { WinningNumbers } from 'components/winning-numbers';
import { Footer } from 'components/footer';

import { formatDate } from 'utils/helpers';

import { ReactComponent as Logo } from 'assets/img/logo.svg';

import * as S from './styles';

const GAMES = [
  { id: '1', name: 'Mega-sena' },
  { id: '2', name: 'Quina' },
  { id: '3', name: 'Lotofácil' },
  { id: '4', name: 'Lotomania' },
  { id: '5', name: 'Timemania' },
  { id: '6', name: 'Dia de sorte' }
];

const GAMES_COLORS: Record<string, string> = {
  'mega-sena': '#6BEFA3',
  quina: '#8666EF',
  lotofácil: '#DD7AC6',
  lotomania: '#FFAB64',
  timemania: '#5AAD7D',
  'dia de sorte': '#BFAF83'
};

function Home() {
  const [game, setGame] = React.useState('mega-sena');
  const [isLoading, setIsLoading] = React.useState(false);

  const timeId = React.useRef<NodeJS.Timeout | null>(null);

  function handleGameChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }

    const { value } = event.currentTarget;

    timeId.current = setTimeout(() => {
      const game = GAMES.find((game) => game.id === value);

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setGame(game?.name.toLowerCase() ?? 'mega-sena');
      }, 1000);
    }, 100);
  }

  React.useEffect(() => {}, [game]);

  return (
    <S.Wrapper
      aria-labelledby="#game-title"
      style={{ '--bg-color': GAMES_COLORS[game] } as React.CSSProperties}
    >
      <S.SideBar
        style={{ '--opacity': isLoading ? 0 : 1 } as React.CSSProperties}
      >
        <Select
          aria-label="Escolha o jogo"
          id="games"
          onChange={handleGameChange}
        >
          {GAMES.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </Select>

        <S.Title id="game-title">
          <Logo aria-hidden={true} />
          <span>{game}</span>
        </S.Title>

        <DrawInfo id="4560" date={formatDate('2021-04-20T00:28:09.426Z')} />
      </S.SideBar>

      <S.Body className={isLoading ? 'clipped' : undefined}>
        <WinningNumbers numbers={['06', '09', '28', '33', '37', '40']} />
        <Footer />
      </S.Body>
    </S.Wrapper>
  );
}

export { Home };
