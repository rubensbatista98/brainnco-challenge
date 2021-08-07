import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *::before,
  *::after{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
}

  body {
    min-height: 100vh;

    font-family: 'Montserrat', sans-serif;;
    color: #333333, 100%;
    background-color: #EFEFEF;
  }
`;
