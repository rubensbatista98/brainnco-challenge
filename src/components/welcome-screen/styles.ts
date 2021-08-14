import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;

  display: grid;
  justify-items: center;
  align-content: start;
  gap: 5rem;

  color: #fff;

  background-color: hsl(205, 100%, 35.1%);
  background-image: linear-gradient(
    160deg,
    hsl(205, 100%, 35%) 20%,
    hsl(183, 55%, 44%) 100%
  );

  padding: 1rem;
  padding-block-start: 10vh;

  > svg {
    width: 10rem;
    height: 10rem;
  }
`;

export const Title = styled.h1`
  font-size: 4rem;
  text-align: center;

  max-inline-size: 14ch;
`;

export const Spinner = styled.div`
  display: block;

  width: 5rem;
  height: 5rem;

  border: 0.4rem solid hsl(32, 93%, 54%);
  border-left-color: transparent;
  border-radius: 50%;

  pointer-events: none;

  animation: ${spin} 1s ease-out infinite;
`;

export const Error = styled.div`
  max-inline-size: 60ch;

  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: hsl(34, 100%, 60%);
`;
