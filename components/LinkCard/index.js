import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Divider,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { FileCopy, Assessment } from "@material-ui/icons";
import Alert from "@./components/Alert";
import { parseTimeStamp } from "@./helpers/date";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: "12px",
    marginTop: "12px",
    marginBottom: "24px",
    width: "100%",
    border: "solid 2px #F5F5F5",
    boxShadow: "0px 4px 12px rgb(0 0 0 / 5%)",
    borderRadius: "4px",
  },
  linkTitle: {
    fontSize: "1.05rem",
    fontFamily: "Lato",
    letterSpacing: "-0.035em",
    fontWeight: "600",
  },
  date: {
    fontSize: "0.875rem",
    fontWeight: "600",
    fontFamily: "Lato",
    width: "100px",
    textAlign: "center",
    color: "#808080",
  },
  link: {
    fontSize: "0.9rem",
    fontFamily: "Lato",
    letterSpacing: "0px",
    color: "#808080",
    wordWrap: "break-word",
    [theme.breakpoints.down("xs")]: {
      marginTop: "8px",
    },
  },
  shortLinkContainer: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    },
  },
  shortLink: {
    fontSize: "0.95rem",
    fontFamily: "Lato",
    letterSpacing: "0px",
    color: "#00ADB5",
    fontWeight: "600",
    wordBreak: "break-all",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginTop: "8px",
    },
  },
  clicks: {
    marginTop: "8px",
    fontSize: "0.92rem",
    fontFamily: "Lato",
    letterSpacing: "0px",
    fontWeight: "600",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  divider: {
    marginTop: "12px",
    marginBottom: "12px",
    width: "100%",
  },
  button: {
    textTransform: "none",
    color: "white",
    height: "42px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      marginTop: "16px",
      marginBottom: "8px",
      width: "100%",
    },
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-end",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "flex-start",
      paddingTop: "3px",
    },
  },
  copyButton: {
    padding: "3px",
    color: "#C1C1C1",
    transform: "scale(0.8)",
    marginLeft: "12px",
    marginTop: "-4px",
  },
  closeButton: {
    padding: theme.spacing(0.5),
  },
}));

const LinkCard = ({ record }) => {
  const classes = useStyles();
  const router = useRouter();
  const [date, setDate] = useState();
  const [shortLink, setShortLink] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleClick = () => {
    router.push("/stats/" + record.Key);
  };

  const handleCopyButtonClick = () => {
    navigator.clipboard.writeText(shortLink);
    setOpenAlert(true);
  };

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    if (!record.CreatedAt) return;
    setDate(parseTimeStamp(record.CreatedAt));
  }, [record.CreatedAt]);

  useEffect(() => {
    if (!record.Key) return;
    if (process.env.prod === "true") {
      setShortLink(
        window.location.origin +
          "/" +
          process.env.redirectingURL +
          "/" +
          record.Key
      );
      return;
    }
    setShortLink(process.env.redirectingURL + "/" + record.Key);
  }, [record.Key]);

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item container justify="space-between">
          <Grid item md={11} sm={10} xs={8} style={{ flexGrow: "1" }}>
            <Typography
              variant="h6"
              component="p"
              className={classes.linkTitle}
            >
              {record.Title}
            </Typography>
          </Grid>
          <Grid item md={1} sm={2} xs={3} className={classes.dateContainer}>
            <Typography variant="body2" component="p" className={classes.date}>
              {date}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "4px" }}>
          <a href={record.Value} target="_blank" rel="noopener noreferrer">
            <Typography variant="body2" component="p" className={classes.link}>
              {record.Value}
            </Typography>
          </a>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item style={{ flexGrow: "1" }}>
          <Grid item xs={12} className={classes.shortLinkContainer}>
            <a href={shortLink} target="_blank" rel="noopener noreferrer">
              <Typography
                variant="body2"
                component="p"
                className={classes.shortLink}
              >
                {shortLink}
              </Typography>
            </a>
            <IconButton
              className={classes.copyButton}
              aria-label="copy"
              onClick={handleCopyButtonClick}
            >
              <FileCopy />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              component="p"
              className={classes.clicks}
            >
              Clicked {record.Clicks} times
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.buttonContainer}>
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<Assessment />}
          >
            Details
          </Button>
        </div>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="success">
          Copied
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LinkCard;
