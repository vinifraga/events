import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from '../styles/global'
import { theme } from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
