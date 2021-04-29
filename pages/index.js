import { useEffect, useState } from "react";
import { i18n, withTranslation } from "@./i18n";
import Head from "next/head";
import Cookies from "cookies";
import cookieCutter from "cookie-cutter";
import { shortenURL, getMultipleRecords } from "@./api";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkCard from "@/components/LinkCard";
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
      backgroundColor: "#00797E",
      cursor: "pointer",
    },
  },
  infoText: {
    fontSize: "0.835rem",
    fontWeight: "400",
    fontFamily: "Open Sans",
  },
  linksContainer: {
    marginTop: "24px",
    width: "100%",
  },
});

const Home = ({ t, links }) => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("resp");
  const [buttonText, setButtonText] = useState("Shorten");
  const [records, setRecords] = useState([]);

  const buttonClick = async () => {
    if (buttonText === "Copied") {
      setButtonText("Copy");
      return;
    }

    if (response === userInput) {
      navigator.clipboard.writeText(response);
      setButtonText("Copied");
      return;
    }

    const res = await shortenURL(userInput);

    const link = {
      Key: res.id,
      Value: userInput,
      Clicks: 0,
      CreatedAt: new Date().getTime(),
      Visits: [],
    };

    if (res.id) {
      const shortURL = process.env.redirectingURL + "/" + res.id;
      setUserInput(shortURL);
      setResponse(shortURL);
      setButtonText("Copy");

      if (!records.length) {
        let arr = [link, undefined, undefined];
        cookieCutter.set("links", JSON.stringify(arr));
        setRecords(arr);
        return;
      }

      if (records.length >= 2) {
        let arr = [link, records[0], records[1]];
        cookieCutter.set("links", JSON.stringify(arr));
        setRecords(arr);
        return;
      }
      let arr = [link, records[0], undefined];
      cookieCutter.set("links", JSON.stringify(arr));
      setRecords(arr);
    }
  };

  useEffect(() => {
    if (links) {
      setRecords(links);
      fetchRecords();
    }
    async function fetchRecords() {
      let keys = [];
      if (links) {
        for (let i = 0; i < links.length; i++) {
          if (links[i]) {
            keys.push(`keys[${i}]=${links[i].Key}`);
          }
        }
        if (keys.length) {
          let params = "?" + keys.join("&");
          const res = await getMultipleRecords(params);
          setRecords(res.records);
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log(records);
  }, [records]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kapsule</title>
        <link rel="shortcut icon" href="/static/icons/logo.ico" />
      </Head>
      <main className={styles.main}>
        <Typography className={classes.mainText} variant="h1" component="h2">
          {t("title")}
        </Typography>
        <Typography className={classes.subText} variant="h3">
          {t("subTitle")}
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
            style={{ backgroundColor: buttonText === "Copied" && "#00D1DB" }}
            onClick={buttonClick}
          >
            {buttonText}
          </button>
        </div>
        <div style={{ marginTop: "4px" }}>
          <p className={classes.infoText}>
            By using our service you accept the Terms of service and Privacy.
          </p>
        </div>
        <div className={classes.linksContainer}>
          {records &&
            records.length > 0 &&
            records.map((record, index) => {
              if (record != null) {
                return <LinkCard index={index} record={record} />;
              }
            })}
        </div>
      </main>
    </div>
  );
};

// Home.getInitialProps = async () => ({
//   namespacesRequired: ["common", "footer"],
// });

Home.getInitialProps = async ({ req, res }) => {
  // Create a cookies instance
  const cookies = new Cookies(req, res);
  const links = cookies.get("links");

  return {
    namespacesRequired: ["common", "footer"],
    links: links ? JSON.parse(decodeURIComponent(links)) : undefined,
  };
};

export default withTranslation("common")(Home);
