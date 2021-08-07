import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 23rem;

  border-radius: 10px;
  outline-offset: 2px;

  filter: drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.031));
  overflow: hidden;

  :focus-within {
    outline: 2px solid #000;
  }

  > svg {
    position: absolute;
    top: 50%;
    right: 2rem;

    transform: translateY(-50%);

    pointer-events: none;
  }
`;

export const Select = styled.select`
  appearance: none;

  width: 100%;

  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;

  padding: 1.6rem 3rem;
  border: none;

  cursor: pointer;
`;
