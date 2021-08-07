import styled from 'styled-components';

import { gapPrefix } from 'styles/utilities';

import CircleBg from 'assets/img/circle-bg.svg';

export const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  background-color: #6befa3;

  @media (min-width: 62rem) {
    grid-template-columns: min(35%, 55rem) 1fr;
  }
`;

export const SideBar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  color: #fff;

  padding: 4rem 1rem;

  @media (min-width: 62rem) {
    align-items: flex-start;
    padding: 9rem 6rem;
    padding-inline-end: 0;
  }
`;

export const Body = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${CircleBg});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 300vw 200vw;

  padding: 3rem 3rem 2rem;

  ::before {
    display: none;
    content: url(${CircleBg});
  }

  @media (min-width: 62rem) {
    background-position: left center;
    background-size: 100vw 200vw;

    padding-block-start: 0;
    padding-block-end: 9rem;
  }
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
