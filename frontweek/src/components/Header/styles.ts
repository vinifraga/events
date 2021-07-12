import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;

  display: flex;
  justify-content: space-between;

  padding: 48px 16px;
`;

export const MenuLeft = styled.div`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

export const MenuLogo = styled.div``;

export const MenuRight = styled.div`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;