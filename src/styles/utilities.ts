import { css } from 'styled-components';

export const gapPrefix = (value: string) => css`
  @supports not (gap: 1em) {
    & > * {
      margin: ${value};
    }
  }
`;
