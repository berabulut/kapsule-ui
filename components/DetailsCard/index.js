import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Button } from "@material-ui/core";
import { parseTimeStamp } from "@./helpers/date";

const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    padding: "24px",
    marginTop: "12px",
    marginBottom: "12px",
    width: "100%",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  fieldTitle: {
    color: "#808080",
    fontSize: "0.95rem",
    marginBottom: "4px",
  },
  strong: {
    color: "#222831",
    fontSize: "1rem",
  },
});

const DetailsCard = ({ record }) => {
  const classes = useStyles();
  const [date, setDate] = useState();
  const [lastVisit, setLastVisit] = useState();

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

  return (
    <div className={classes.container}>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Page Title : </strong>
        {record.Title}
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Link : </strong>
        {record.Value}
      </Typography>
      <Typography variant="subtitle1" className={classes.fieldTitle}>
        <strong className={classes.strong}>Shortened Link : </strong>
        {record.Key}
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
