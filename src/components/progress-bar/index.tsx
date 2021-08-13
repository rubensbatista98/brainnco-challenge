import { useNProgress } from '@tanem/react-nprogress';
import React from 'react';

import * as S from './styles';

type ProgressBarProps = {
  isLoading?: boolean;
};

function ProgressBar({ isLoading = false }: ProgressBarProps) {
  const [isMounted, setIsMounted] = React.useState(isLoading);

  const { progress } = useNProgress({
    isAnimating: isLoading,
    incrementDuration: 400
  });

  function handleTransitionEnd() {
    if (!isLoading) {
      setIsMounted(false);
    }
  }

  React.useEffect(() => {
    if (isLoading) {
      setIsMounted(true);
    }
  }, [isLoading]);

  return isMounted ? (
    <S.Wrapper
      aria-live="assertive"
      aria-label="Carregando"
      onTransitionEnd={handleTransitionEnd}
      style={{ '--size': `${progress * 100}%` } as React.CSSProperties}
    />
  ) : null;
}

export { ProgressBar };
