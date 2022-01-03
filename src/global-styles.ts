import { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyles = createGlobalStyle`
  html {
    font-family: system-ui; 
    font-size: 14px;
  }

  body {
    margin: 0
  }

  * {
    box-sizing: border-box;
  }
`;
