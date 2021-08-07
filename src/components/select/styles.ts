import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 23rem;

  filter: drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.031));

  > svg {
    position: absolute;
    top: 50%;
    right: 2rem;

    transform: translateY(-50%);

    pointer-events: none;

    transition: transform 250ms cubic-bezier(0, -0.69, 1, 1.95);

    &.boop {
      transform: translateY(100%);
    }
  }
`;

export const Select = styled.select`
  --outline: 2px solid #000000;

  appearance: none;

  width: 100%;

  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;

  padding: 1.6rem 3rem;

  border: none;
  border-radius: 10px;

  outline-offset: 2px;

  :focus-visible {
    outline: var(--outline);
  }

  @supports not selector(:focus-visible) {
    :focus {
      outline: var(--outline);
    }
  }

  cursor: pointer;
`;
