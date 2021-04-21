import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import App from "next/app";

import { appWithTranslation } from "@./i18n";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";

import { Header, Footer } from "../components/layout";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles({
  mainText: {
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    marginTop: "16px",
    fontSize: "3rem",
    paddingLeft: "64px",
  },
  icon: {
    fontSize: "60px",
    transform: "rotate(-45deg)",
    color: "#00ADB5",
  },
});

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <header>
          <Typography className={classes.mainText} variant="h1">
            <LinkIcon className={classes.icon} />
            Kapsule
          </Typography>
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
