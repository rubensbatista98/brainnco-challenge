import React from 'react';

import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';

import * as S from './styles';

type SelectProps = React.HTMLAttributes<HTMLSelectElement>;

function Select({ children, ...props }: SelectProps) {
  return (
    <S.Wrapper>
      <S.Select {...props}>{children}</S.Select>
      <ArrowDown aria-hidden={true} />
    </S.Wrapper>
  );
}

export type { SelectProps };
export { Select };
