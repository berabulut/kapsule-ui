import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider, Button } from "@material-ui/core";
import AssessmentIcon from "@material-ui/icons/Assessment";


const useStyles = makeStyles({
  container: {
    backgroundColor: "white",
    padding: "12px",
    marginTop: "12px",
    marginBottom: "12px",
    width: "100%",
    border: "solid 2px #F5F5F5",
    borderRadius: "4px",
  },
  linkTitle: {
    fontSize: "1rem",
  },
  date: {
    fontSize: "0.825rem",
    fontWeight: "500",
    width: "100px",
    textAlign: "center",
    color: "#808080",
  },
  link: {
    fontSize: "0.85rem",
    fontFamily: "Open Sans",
    letterSpacing: "0px",
    color: "#808080",
  },
  shortLink: {
    fontSize: "0.95rem",
    fontFamily: "Open Sans",
    letterSpacing: "0px",
    color: "#00ADB5",
    fontWeight: "600",
  },
  clicks: {
    marginTop: "8px",
    fontSize: "0.85rem",
    fontFamily: "Open Sans",
    letterSpacing: "0px",
    fontWeight: "600",
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
});

const LinkCard = ({ record }) => {
  const classes = useStyles();
  const [date, setDate] = useState();

  useEffect(() => {
    if(record.CreatedAt) {
      setDate(new Date(record.CreatedAt * 1000).toLocaleDateString()) 
    }
  }, [record.CreatedAt])

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item style={{ flexGrow: "1" }}>
          <Typography variant="h6" component="p" className={classes.linkTitle}>
            URL Shortener - Szukaj w Google
          </Typography>
        </Grid>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" component="p" className={classes.date}>
            {date}
          </Typography>
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
          <Grid item xs={12}>
              <a href={process.env.redirectingURL + "/" + record.Key} target="_blank" rel="noopener noreferrer">
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.shortLink}
                >
                  {process.env.redirectingURL + "/" + record.Key}
                </Typography>
              </a>
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
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AssessmentIcon />}
          >
            Details
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default LinkCard;
