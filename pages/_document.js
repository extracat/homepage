import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <script type="text/javascript" src='/noflash.js' />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}