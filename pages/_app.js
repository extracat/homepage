import Script from 'next/script'
import Head from 'next/head'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import * as gtag from '../lib/gtag'
import '../styles/defaults.scss'
import '../styles/layout.scss'
import '../styles/typography-sans.scss'
import '../styles/markdown.scss'
import '../styles/color-scheme.scss'
import '../styles/components.scss'

// MD Style Wrapper
const components = {
  h1:  props => <h1 className={"markdown"} {...props} />,
  h2:  props => <h2 className={"markdown"} {...props} />,
  h3:  props => <h3 className={"markdown"} {...props} />,
  h4:  props => <h4 className={"markdown"} {...props} />,
  h5:  props => <h5 className={"markdown"} {...props} />,
  h6:  props => <h6 className={"markdown"} {...props} />,
}

function MyApp({ Component, pageProps }) {

  {/* Google Analytics event fires on page view */}
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  


  {/*  Reset NDA cookie if needed */}
  useEffect(() => {
    if (router.query.reset === 'true') {
      Cookies.remove('ndaPassed');
      router.replace(router.pathname, router.asPath.split('?')[0], { shallow: true });
    }
  }, [router.query.reset]);



  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}');
          `,
        }}
      />

      {/* Google Tag Manager */}

      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtag.GTM_ID}');             
          `,
        }}
      />


      <Component {...pageProps} components={components} />
    </>
  );
}

export default MyApp
