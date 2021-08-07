import React from 'react';

import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg';

import * as S from './styles';

type SelectProps = React.HTMLAttributes<HTMLSelectElement>;

function Select({ children, ...props }: SelectProps) {
  const [isBooped, setIsBooped] = React.useState(false);

  React.useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped]);

  const trigger = () => {
    setIsBooped(true);
  };

  return (
    <S.Wrapper onMouseEnter={trigger}>
      <S.Select {...props}>{children}</S.Select>
      <ArrowDown className={isBooped ? 'boop' : ''} aria-hidden={true} />
    </S.Wrapper>
  );
}

export type { SelectProps };
export { Select };
