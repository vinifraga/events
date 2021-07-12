import styled from 'styled-components'

export const Hero = styled.div``;

export const Content = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px 16px;
  
  @media screen and (max-width: 960px) {
    height: auto;
    flex-direction: column;
  }

  div {
    margin: 40px 0;
  }

  div:nth-child(1) {
    flex-grow: 3;

    .mask {
      background: linear-gradient(225deg, #2dc7ed 0%, #538bf0 100%);

      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    a {
      margin-top: 64px;
      display: inline-block;
      text-transform: uppercase;

      padding: 16px 24px;
      font-size: 24px;

      position: relative;

      &::after {
        content: '';
        display: block;

        position: absolute;
        top: 0;
        left: 0;

        z-index: -1;

        transform: translate(-5%, -24%) rotate(45deg);

        width: 120px;
        height: 120px;

        border-radius: 4px;

        background: linear-gradient(225deg, #2dc7ed 0%, rgba(83, 139, 240, 0) 100%);
      
        transition: .5s ease;
      }

      &:hover {
        &::after {
          transform: translate(-5%, -24%) rotate(60deg);
        }
      }
    }
  }

  div:nth-child(2) {
    flex-grow: 2;
    
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 400px;
    }
  }
`;