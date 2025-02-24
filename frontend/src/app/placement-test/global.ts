import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --sidebar-width: 16rem;
    font-size: calc(1px + (100vw - 375px) / 375 * 1);
  }

  body{
    font-family: "Mulish", sans-serif;
  }

  @media (min-width: 768px) {
    :root {
      font-size: calc(1px + (100vw - 1440px) / 1440);
    }
  }

`;

export default GlobalStyle;