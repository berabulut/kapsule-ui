import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Snackbar, IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { parseTimeStamp } from "@./helpers/date";
import Alert from "@./components/Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    padding: "24px",
    marginTop: "12px",
    marginBottom: "12px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      padding: "16px",
    },
  },
  fieldTitle: {
    color: "#808080",
    fontSize: "1rem",
    marginBottom: "4px",
    wordWrap: "break-word",
    fontFamily: "Lato",
    // whiteSpace: "nowrap",
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    // [theme.breakpoints.down("xs")]: {
    //   wordWrap: "break-word",
    // },
  },
  strong: {
    color: "#222831",
    fontSize: "1.09rem",
    paddingRight: "5px",
  },
  copyButton: {
    padding: "3px",
    color: "#C1C1C1",
    transform: "scale(0.8)",
    marginLeft: "12px",
    marginTop: "-4px",
  },
}));

const DetailsCard = ({ record }) => {
  const classes = useStyles();
  const [date, setDate] = useState();
  const [lastVisit, setLastVisit] = useState();
  const [shortLink, setShortLink] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (!record.CreatedAt) return;
    setDate(parseTimeStamp(record.CreatedAt));
  }, [record.CreatedAt]);

  useEffect(() => {
    if (!record.LastTimeVisited) return;
    const date = new Date(record.LastTimeVisited);
    const time = date.toLocaleTimeString();
    const cal = date.toLocaleDateString();
    setLastVisit([cal, time]);
  }, [record.LastTimeVisited]);

  useEffect(() => {
    if (!record.Key) return;
    if (process.env.prod) {
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

  return (
    <div className={classes.container}>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Page Title : </strong>
        {record.Title}
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Link : </strong>
        <a href={record.Value} target="_blank" rel="noopener noreferrer">
          {record.Value}
        </a>
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Shortened Link : </strong>
        <a href={shortLink} target="_blank" rel="noopener noreferrer">
          {shortLink}
        </a>
        <IconButton
          className={classes.copyButton}
          aria-label="copy"
          onClick={handleCopyButtonClick}
        >
          <FileCopy />
        </IconButton>
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Created At : </strong>
        {date}
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Last Time Visited : </strong>
        {lastVisit && lastVisit[0] + " " + lastVisit[1]}
      </Typography>
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

export default DetailsCard;
