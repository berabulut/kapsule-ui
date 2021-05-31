import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Button } from "@material-ui/core";
import { parseTimeStamp } from "@./helpers/date";

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
    fontFamily: "Lato"
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
    paddingRight: "5px"
  },
}));

const DetailsCard = ({ record }) => {
  const classes = useStyles();
  const [date, setDate] = useState();
  const [lastVisit, setLastVisit] = useState();
  const [shortLink, setShortLink] = useState();

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
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Created At : </strong>
        {date}
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Last Time Visited : </strong>
        {lastVisit && lastVisit[0] + " " + lastVisit[1]}
      </Typography>
    </div>
  );
};

export default DetailsCard;
