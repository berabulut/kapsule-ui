import { useEffect, useState } from "react";
import { i18n, withTranslation } from "@./i18n";
import { Typography, Snackbar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { shortenURL, getMultipleRecords } from "@./api";
import LinkCard from "@/components/LinkCard";
import Alert from "@/components/Alert";
import styles from "../styles/Home.module.css";
import Cookies from "cookies";
import JSCookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  mainText: {
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    fontSize: "5.5rem",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3.5rem",
    },
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      fontSize: "1.1rem",
      marginTop: "4px",
    },
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
    fontSize: "1.15rem",
    fontWeight: "450",
    fontFamily: "Roboto",
    color: "#808080",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "12px",
      marginRight: "15px",
      fontSize: "1rem",
      height: "50px",
      width: "100%",
      marginBottom: "16px",
    },
  },
  button: {
    flexGrow: 1,
    backgroundColor: "#00ADB5",
    color: "white",
    border: "0px",
    borderRadius: "4px",
    boxShadow:
      "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;",
    fontSize: "1.5rem",
    fontFamily: "Roboto",
    fontWeight: "450",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#00797E",
      cursor: "pointer",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      height: "45px",
      width: "50%",
      margin: "auto",
    },
  },
  infoText: {
    fontSize: "0.9rem",
    fontWeight: "400",
    fontFamily: "Lato",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "12px",
      paddingRight: "12px",
      fontSize: "0.835rem",
    },
  },
  linksContainer: {
    marginTop: "24px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      marginTop: "4px",
    },
  },
  inputWrapper: {
    display: "flex",
    width: "100%",
    height: "60px",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
      flexDirection: "column",
    },
  },
}));

const Home = ({ t, links }) => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("resp");
  const [buttonText, setButtonText] = useState("Shorten");
  const [records, setRecords] = useState([]);
  const [openError, setOpenError] = useState(false);
  const [alert, setAlert] = useState({});

  const buttonClick = async () => {
    if (!userInput.length > 0) {
      setAlert({ type: "warning", text: t("emptyError") });
      setOpenError(true);
      return;
    }

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

    if (res?.error) {
      setAlert({ type: "error", text: res.error + " " + res.text });
      setOpenError(true);
      return;
    }

    const link = {
      Key: res.id,
      Value: userInput,
      Clicks: 0,
      CreatedAt: new Date().getTime(),
      Title: res.title,
    };

    if (res.id) {
      let shortURL;
      if (process.env.prod) {
        shortURL =
          window.location.origin +
          "/" +
          process.env.redirectingURL +
          "/" +
          res.id;
      } else shortURL = process.env.redirectingURL + "/" + res.id;
      setUserInput(shortURL);
      setResponse(shortURL);
      setButtonText("Copy");

      if (!records?.length) {
        let arr = [link, undefined, undefined];
        JSCookies.set("links", JSON.stringify(arr), { expires: 365 });
        setRecords(arr);
        return;
      }

      if (records?.length >= 2) {
        let arr = [link, records[0], records[1]];
        JSCookies.set("links", JSON.stringify(arr), { expires: 365 });
        setRecords(arr);
        return;
      }
      let arr = [link, records[0], undefined];
      JSCookies.set("links", JSON.stringify(arr), { expires: 365 });
      setRecords(arr);
    }
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
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

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Typography className={classes.mainText} variant="h1" component="h2">
          {t("title")}
        </Typography>
        <Typography className={classes.subText} variant="h3">
          {t("subTitle")}
        </Typography>
        <div className={classes.inputWrapper}>
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
        <div style={{ marginTop: "8px", width: "100%", textAlign: "center" }}>
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
        <Snackbar open={openError} autoHideDuration={4000} onClose={closeError}>
          <Alert onClose={closeError} severity={alert.type}>
            {alert.text}
          </Alert>
        </Snackbar>
      </main>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const links = cookies.get("links");

  try {
    return {
      props: {
        namespacesRequired: ["common", "footer"],
        links: links ? JSON.parse(decodeURIComponent(links)) : null,
      },
    };
  } catch (err) {
    return {
      props: {
        namespacesRequired: ["common", "footer"],
        links: null,
      },
    };
  }
}

export default withTranslation("common")(Home);
