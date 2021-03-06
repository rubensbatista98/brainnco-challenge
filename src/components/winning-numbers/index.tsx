import * as S from './styles';

type WinningNumbersProps = {
  numbers: Array<string>;
};

function WinningNumbers({ numbers }: WinningNumbersProps) {
  return (
    <S.Wrapper aria-atomic={true} aria-live="polite" title="Números sorteados">
      {numbers.map((number) => (
        <S.Number key={number}>{number}</S.Number>
      ))}
    </S.Wrapper>
  );
}

export { WinningNumbers };
