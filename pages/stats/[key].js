import { getStats } from "api";
import { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClicksChart from "@/components/ClicksChart";
import BrowsersChart from "@/components/BrowsersChart";
import DetailsCard from "@/components/DetailsCard";
import styles from "@./styles/Home.module.css";
import { data } from "@./data";
import { parseTimeStamp } from "@./helpers/date";
import { browserStatistics } from "@./helpers/userAgent";

const useStyles = makeStyles({
  mainText: {
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    fontSize: "3.5rem",
  },
  clicksText: {
    fontWeight: "600",
    fontSize: "2.25rem",
    textAlign: "center",
    paddingTop: "24px",
  },
  counterText: {
    color: "#00ADB5",
    textAlign: "center",
    fontSize: "6rem",
    fontWeight: "400",
  },
});

const Stats = ({ record }) => {
  const classes = useStyles();
  const [clicksChartData, setClicksChartData] = useState([]);
  const [browserChartData, setBrowserChartData] = useState([]);

  useEffect(() => {
    console.log(record);
    if (!record) return;
    if (!record.Visits) return;

    let arr = [
      {
        id: "clicks",
        color: "rgb(0, 173, 181)",
        data: [],
      },
    ];
    for (let i = 0; i < record.Visits.length; i++) {
      const visit = record.Visits[i];
      arr[0].data.push({
        x: parseTimeStamp(visit.Date),
        y: visit.Clicks,
      });
    }

    if (record.Visits.length === 0) {
      arr[0].data.push({
        x: parseTimeStamp(record.CreatedAt),
        y: 0,
      });
    }

    if (record.Visits.length === 1) {
      if (record.Visits[0].Date - record.CreatedAt >= 86400) {
        arr[0].data.unshift({
          x: parseTimeStamp(record.CreatedAt),
          y: 0,
        });
      }
    }

    setClicksChartData(arr);
    setBrowserChartData(browserStatistics(record.Visits));
  }, []);
  return (
    <div className={styles.detailsContainer}>
      <main className={styles.main} style={{ paddingTop: "0px" }}>
        <Typography className={classes.mainText} variant="h1" component="h2">
          All Time Statistics
        </Typography>
        <Grid
          container
          style={{ marginTop: "100px", justifyContent: "space-around" }}
        >
          <Grid item xs={10} sm={6}>
            <DetailsCard record={record} />
          </Grid>
          <Grid item xs={10} sm={4}>
            <Typography
              className={classes.clicksText}
              variant="h3"
              component="p"
            >
              Total Clicks
            </Typography>
            <Typography className={classes.counterText} component="p">
              {record.Clicks}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: "100px", justifyContent: "space-around" }}
        >
          <ClicksChart data={clicksChartData} />
        </Grid>
        <Grid
          container
          style={{ marginTop: "100px", justifyContent: "space-around" }}
        >
          <Grid item xs={10} sm={5}>
            <BrowsersChart data={browserChartData} />
          </Grid>
          <Grid item xs={10} sm={5}>
            <BrowsersChart data={browserChartData} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const res = await getStats(query.key);
  const record = res.record;

  return { props: { record } };
}

export default Stats;
