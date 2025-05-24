import { Html, Head, Main, NextScript } from 'next/document'
import YandexMetrika from '../components/YandexMetrika'
import * as gtag from '../lib/gtag'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" /> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Overpass:ital@1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <script type="text/javascript" src='/noflash.js' />

        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src = {"https://www.googletagmanager.com/ns.html?id=" + gtag.GTM_ID}
        height="0" width="0" style={{display: "none", visibility: "hidden"}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}

        <YandexMetrika yid={"92706094"} webvisor={false} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}