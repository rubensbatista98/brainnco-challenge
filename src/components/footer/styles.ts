import styled from 'styled-components';

export const Wrapper = styled.footer`
  max-width: 32rem;

  font-size: 1.4rem;
  text-align: center;
  line-height: 1.5;

  @media (min-width: 75rem) {
    max-width: unset;
    font-size: 1.6rem;
  }
`;
