import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import App from "next/app";

import { appWithTranslation } from "@./i18n";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";

import { Header, Footer } from "@./components/Layout";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Kapsule - URL Shortener</title>
        <link rel="shortcut icon" href="/static/icons/logo.ico" />
        <meta name="description" content="Shorten your URLs and track their performance with some statistics." />
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
