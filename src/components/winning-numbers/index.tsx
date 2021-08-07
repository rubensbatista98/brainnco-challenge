import * as S from './styles';

type WinningNumbersProps = {
  numbers: Array<string>;
};

function WinningNumbers({ numbers }: WinningNumbersProps) {
  return (
    <S.Wrapper aria-label="Números sorteados">
      {numbers.map((number) => (
        <S.Number>{number}</S.Number>
      ))}
    </S.Wrapper>
  );
}

export { WinningNumbers };
