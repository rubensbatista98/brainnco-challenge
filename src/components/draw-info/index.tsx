import MediaQuery from 'react-responsive';

import * as S from './styles';

type DrawInfoProps = {
  id: string;
  date: string;
};

function DrawInfo({ id, date }: DrawInfoProps) {
  function formatDate(date: string) {
    return Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short'
    }).format(new Date(date));
  }

  return (
    <S.Wrapper>
      Concurso{' '}
      <MediaQuery maxWidth="62rem">
        <span aria-label="Número">Nº</span> {id}
      </MediaQuery>
      <MediaQuery minWidth="62rem">
        <strong>
          {id} – {formatDate(date)}
        </strong>
      </MediaQuery>
    </S.Wrapper>
  );
}

export { DrawInfo };
