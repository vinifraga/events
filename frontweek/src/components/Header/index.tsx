import Link from 'next/link';

import { Container, MenuLeft, MenuLogo, MenuRight } from "./styles";

export function Header() {
  return (
    <Container>
      <MenuLeft>
        <Link href="">
          <a className="link">Home</a>
        </Link>
        <Link href="">
          <a className="link">About</a>
        </Link>
      </MenuLeft>

      <MenuLogo>
        <h5>Vini</h5>
      </MenuLogo>

      <MenuRight>
        <Link href="">
          <a className="link">Works</a>
        </Link>
        <Link href="">
          <a className="link">Get in touch</a>
        </Link>
      </MenuRight>
    </Container>
  )
}