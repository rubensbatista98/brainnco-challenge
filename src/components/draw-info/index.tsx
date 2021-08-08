import MediaQuery from 'react-responsive';

import * as S from './styles';

type DrawInfoProps = {
  id: string;
  date: string;
};

function DrawInfo({ id, date }: DrawInfoProps) {
  return (
    <S.Wrapper>
      Concurso{' '}
      <MediaQuery maxWidth="62rem">
        <span aria-label="Número">Nº</span> {id}
      </MediaQuery>
      <MediaQuery minWidth="62rem">
        <strong>
          {id} – {date}
        </strong>
      </MediaQuery>
    </S.Wrapper>
  );
}

export { DrawInfo };
