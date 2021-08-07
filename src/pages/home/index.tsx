import React from 'react';

import { Select } from 'components/select';
import { DrawInfo } from 'components/draw-info';
import { WinningNumbers } from 'components/winning-numbers';
import { Footer } from 'components/footer';

import { ReactComponent as Logo } from 'assets/img/logo.svg';

import * as S from './styles';

function Home() {
  return (
    <S.Wrapper aria-labelledby="#game-title">
      <S.SideBar>
        <Select aria-label="Escolha o jogo" id="games">
          <option value="1">Mega-sena</option>
          <option value="2">Quina</option>
          <option value="3">Lotofácil</option>
          <option value="4">Lotomania</option>
          <option value="5">Timemania</option>
          <option value="6">Dia de sorte</option>
        </Select>

        <S.Title id="game-title">
          <Logo aria-hidden={true} />
          <span>Dia de sorte</span>
        </S.Title>

        <DrawInfo id="4560" date="2021-04-20T00:28:09.426Z" />
      </S.SideBar>

      <S.Body>
        <WinningNumbers numbers={['06', '09', '28', '33', '37', '40']} />
        <Footer />
      </S.Body>
    </S.Wrapper>
  );
}

export { Home };
