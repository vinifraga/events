import Head from "next/head"
import Link from "next/link"

import { Header } from '../components/Header';
import { Content, Hero } from "./home.styles"

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfólio #FrontWeek</title>
      </Head>

      <Header/>

      <Hero />

      <Content>
        <div>
          <h1>Vinícius Fraga</h1>
          <h3 className="mask">Web/Mobile Developer</h3>
          <h3 className="mask">Content Creator</h3>

          <Link href="/works">
            <a>works</a>
          </Link>
        </div>

        <div>
          <img src="https://github.com/vinifraga.png" alt="Vini" />
        </div>
      </Content>
    </>
  )
}
