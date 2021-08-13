import { ReactComponent as Logo } from 'assets/img/logo.svg';

import * as S from './styles';

function WelcomeScreen() {
  return (
    <S.Wrapper aria-labelledby="#title" aria-busy={true}>
      <Logo aria-hidden={true} />

      <S.Title id="title">Loterias Online da Caixa</S.Title>

      <S.Spinner
        aria-live="assertive"
        aria-label="Carregando o último concurso das loterias"
      />
    </S.Wrapper>
  );
}

export { WelcomeScreen };
