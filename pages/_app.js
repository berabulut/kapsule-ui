import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import App from "next/app";
import { useRouter } from 'next/router'

import { appWithTranslation } from "@./i18n";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";

import { Header, Footer } from "@./components/Layout";

import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Kapsule - URL Shortener</title>
        <link rel="shortcut icon" href="/static/icons/logo.ico" />
        <meta name="title" content="Kapsule - URL Shortener" />
        <meta name="description" content="Shorten your URLs and track their performance with some statistics." />
        <meta property="og:title" content="Kapsule - URL Shortener" />
        <meta property="og:url" content="http://kapsule.click/" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Shorten your URLs and track their performance with some statistics." />
        <meta property="og:image" content="https://github.com/berabulut/kapsule-ui/blob/main/public/static/icons/kapsule.png?raw=true" />
      </Head>
      <ThemeProvider theme={theme}>
        <header>
          <Header />
        </header>
        <CssBaseline />
        <Component {...pageProps} />
        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
