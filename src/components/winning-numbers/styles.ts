import styled from 'styled-components';

import { gapPrefix } from 'styles/utilities';

export const Wrapper = styled.ul`
  list-style: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;

  ${gapPrefix(`1.2rem`)}
`;

export const Number = styled.li`
  --size: 7.5rem;

  display: inline-grid;
  place-items: center;

  inline-size: var(--size);
  block-size: var(--size);

  font-size: 2rem;
  font-weight: bold;

  background-color: #fff;
  border-radius: 50%;

  @media (min-width: 62rem) {
    --size: 11rem;
    font-size: 2.7rem;
  }
`;
