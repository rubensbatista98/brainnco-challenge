import { ReactComponent as Logo } from 'assets/img/logo.svg';

import * as S from './styles';

type WelcomeScreenProps = {
  hasError?: boolean;
  message?: string | null;
};

function WelcomeScreen({ hasError = false, message }: WelcomeScreenProps) {
  return (
    <S.Wrapper aria-labelledby="#title" aria-busy={true}>
      <Logo aria-hidden={true} />

      <S.Title id="title">Loterias Online da Caixa</S.Title>

      {hasError ? (
        <S.Error aria-live="assertive">
          <span>{message}</span>
        </S.Error>
      ) : (
        <S.Spinner
          aria-live="assertive"
          aria-label="Carregando o último concurso das loterias"
        />
      )}
    </S.Wrapper>
  );
}

export { WelcomeScreen };
