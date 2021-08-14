import styled, { css } from 'styled-components';

import { Wrapper as ProgressBar } from 'components/progress-bar/styles';
import { Wrapper as WinningNumbers } from 'components/winning-numbers/styles';

import { gapPrefix } from 'styles/utilities';

import CircleBg from 'assets/img/circle-bg.svg';

export const Wrapper = styled.main`
  --transition-duration: 250ms;

  min-height: 100vh;
  display: grid;
  background-color: var(--bg-color, hsl(205, 100%, 35%));

  > ${ProgressBar} {
    z-index: 10;
  }

  @media (min-width: 62rem) {
    grid-template-columns: min(35%, 55rem) 1fr;
  }
`;

export const SideBar = styled.section<{ hide: boolean }>`
  ${({ hide }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    ${gapPrefix(`1rem`)}

    color: #fff;

    padding: 4rem 1rem;

    pointer-events: ${hide ? 'none' : 'all'};

    opacity: ${hide ? '0' : '1'};
    transition: opacity calc(var(--transition-duration) + 50ms) ease-in-out;

    > ${Title} {
      margin: auto 0;
    }

    @media (min-width: 62rem) {
      align-items: flex-start;
      padding: 9rem 6rem;
      padding-inline-end: 0;
    }
  `}
`;

export const Body = styled.section<{ hide: boolean }>`
  ${({ hide }) => css`
    --clipped: circle(0% at 50% 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;

    background-image: url(${CircleBg});
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 600vw 400vw;

    padding: 3rem 3rem 2rem;

    ::before {
      display: none;
      content: url(${CircleBg});
    }

    > :is(${WinningNumbers}, ${Error}) {
      margin: auto 0;
    }

    @media (prefers-reduced-motion: no-preference) {
      clip-path: ${hide ? 'var(--clipped)' : 'circle(100%)'};
      transition: clip-path var(--transition-duration) ease-in;
    }

    @media (prefers-reduced-motion: reduce) {
      opacity: ${hide ? 0 : 1};
      transition: opacity var(--transition-duration) ease;
    }

    @media (min-width: 62rem) {
      --clipped: circle(0% at 100% 50%);

      background-position: left center;
      background-size: 100vw 200vw;

      padding: 9rem 5rem;
    }
  `}
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  ${gapPrefix(`.5rem`)}

  @media (min-width: 75rem) {
    flex-direction: row;
    gap: 2rem;

    ${gapPrefix(`1rem`)}
  }
`;

export const Error = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;
