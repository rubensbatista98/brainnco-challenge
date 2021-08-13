import styled from 'styled-components';

export const Wrapper = styled.div`
  --size: 0%;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  inline-size: 100vw;
  block-size: 0.8rem;

  background-color: hsl(205, 100%, 35%);
  box-shadow: 0px 0px 20px hsl(183, 55%, 44%);

  transform-origin: 0px;
  transform: scaleX(var(--size));
  transition: transform 250ms ease;
`;
