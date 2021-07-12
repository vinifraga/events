import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  body {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.blackDark};
  }

  h1, h2, h3, h4, h5, h6, p, a {
    font-family: 'Barlow Condensed', sans-serif;
    color: ${({ theme }) => theme.colors.whiteNormal};
    font-weight: 400;
  }
  
  a {
    text-decoration: none;
  }

  .link {
    position: relative;
    padding: 8px 24px;
    font-size: 24px;

    transition: .5s ease;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 100%;
      left: 0;

      width: 0%;
      height: 2px;

      transform: translate(20%, -50%);
      transition: .5s ease;

      background-color: ${({ theme }) => theme.colors.whiteNormal};
    }

    &:hover {
      opacity: .8;

      &::after {
        width: 70%;
      }
    }
  }

  h1 {
    font-size: 96px;

    @media screen and (max-width: 960px) {
      font-size: 64px;
    }
  }

  h2 {
    font-size: 72px;
    line-height: 110%;

    @media screen and (max-width: 960px) {
      font-size: 48px;
    }
  }

  h3 {
    font-size: 40px;
    line-height: 110%;
  }

  h4 {
    font-size: 32px;
    line-height: 120%;

  }

  h5 {
    font-size: 24px;
    line-height: 140%;
  }

  h6 {
    font-size: 18px;
    line-height: 150%;
  }
`