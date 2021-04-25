import { useState } from "react";
import { i18n, withTranslation } from "@./i18n";
import Head from "next/head";
import { shortenURL } from "@./api";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";

const useStyles = makeStyles({
  mainText: {
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    fontSize: "5.5rem",
  },
  subText: {
    fontWeight: 500,
    fontSize: "1.5rem",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    lineHeight: "1.3",
    color: "#393E46",
    marginBottom: "30px",
  },
  input: {
    outlineColor: "#c5c4c4",
    marginRight: "30px",
    flexGrow: 4,
    backgroundColor: "#F5F5F5",
    borderColor: "#F5F5F5",
    borderRadius: "0px",
    borderWidth: "0px",
    paddingLeft: "24px",
    fontSize: "1.25rem",
    fontWeight: "450",
    fontFamily: "Roboto",
    color: "#808080",
  },
  button: {
    flexGrow: 1,
    backgroundColor: "#00ADB5",
    color: "white",
    border: "0px",
    fontSize: "1.5rem",
    fontFamily: "Roboto",
    fontWeight: "450",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#11888e",
      cursor: "pointer",
    },
  },
});

const Home = ({ t }) => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("resp");
  const [buttonText, setButtonText] = useState("Shorten");

  const buttonClick = async () => {
    if (buttonText === "Copied") {
      setButtonText("Copy");
      return;
    }

    if (response === userInput) {
      navigator.clipboard.writeText(response)
      setButtonText("Copied");
      return;
    }

    const res = await shortenURL(userInput);
    if (res.id) {
      const shortURL = process.env.redirectingURL + "/" + res.id;
      setUserInput(shortURL);
      setResponse(shortURL);
      setButtonText("Copy");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography className={classes.mainText} variant="h1" component="h2">
          Shorten Any Link
        </Typography>
        <Typography className={classes.subText} variant="h3">
          Track each shortened link in real-time and measure its performance.
        </Typography>
        <div style={{ display: "flex", width: "100%", height: "60px" }}>
          <input
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (response === e.target.value) setButtonText("Copy");
              else setButtonText("Shorten");
            }}
            placeholder="Type or paste your link"
            type="text"
            className={classes.input}
          />
          <button
            className={classes.button}
            style={{ backgroundColor: buttonText === "Copied" && "#49ced4" }}
            onClick={buttonClick}
          >
            {buttonText}
          </button>
        </div>
      </main>
    </div>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "footer"],
});

export default withTranslation("common")(Home);
