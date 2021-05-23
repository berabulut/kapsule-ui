import { getStats } from "api";
import { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClicksChart from "@/components/ClicksChart";
import PieChart from "@/components/PieChart";
import MapChart from "@/components/MapChart";
import DetailsCard from "@/components/DetailsCard";
import styles from "@./styles/Home.module.css";
import { parseTimeStamp } from "@./helpers/date";
import {
  browserStatistics,
  deviceStatistics,
  osStatistics,
  languageStatistics,
} from "@./helpers/userAgent";
import { mapStatistics, countryStatistics } from "@./helpers/map";

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
  chartWrapper: {
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  sectionTitle: {
    fontWeight: "400",
    fontSize: "2rem",
    color: "#808080",
    marginTop: "28px",
    textAlign: "center",
  },
  listItem: {
    fontSize: "2.25rem",
    fontWeight: "500"
  }
});

const Stats = ({ record }) => {
  const classes = useStyles();
  const [clicksChartData, setClicksChartData] = useState([]);
  const [devicesChartData, setDevicesChartData] = useState([]);
  const [browserChartData, setBrowserChartData] = useState([]);
  const [osChartData, setOSChartData] = useState([]);
  const [languagesChartData, setLanguagesChartData] = useState([]);
  const [mapData, setMapData] = useState();
  const [countryData, setCountryData] = useState();

  useEffect(() => {
    if (!record) return;
    if (!record.Visits) return;
    console.log(record);

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
    setDevicesChartData(deviceStatistics(record.Visits));
    setOSChartData(osStatistics(record.Visits));
    setLanguagesChartData(languageStatistics(record.Visits));
    setMapData(mapStatistics(record.Visits));
  }, []);

  useEffect(() => {
    if (!mapData) return;
    setCountryData(countryStatistics(mapData));
  }, [mapData]);

  if (!record) {
    return (
      <div>
        <h1>SOMETHING IS WRONG</h1>
      </div>
    );
  }

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
          <Grid item xs={10} sm={4} className={classes.chartWrapper}>
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
          className={classes.chartWrapper}
        >
          <Typography variant="h3" className={classes.sectionTitle}>
            History
          </Typography>
          <ClicksChart data={clicksChartData} />
        </Grid>
        <Grid
          container
          style={{ marginTop: "100px", justifyContent: "space-around" }}
        >
          <Grid
            item
            xs={10}
            sm={5}
            className={classes.chartWrapper}
            style={{ paddingLeft: "8px" }}
          >
            <Typography variant="h3" className={classes.sectionTitle}>
              OS
            </Typography>
            <PieChart data={osChartData} innerRadius={0} colors="category10" />
          </Grid>

          <Grid
            item
            xs={10}
            sm={5}
            className={classes.chartWrapper}
            style={{ paddingLeft: "8px" }}
          >
            <Typography variant="h3" className={classes.sectionTitle}>
              Devices
            </Typography>
            <PieChart data={devicesChartData} innerRadius={0} colors="accent" />
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: "100px", justifyContent: "space-around" }}
        >
          <Grid
            item
            xs={10}
            sm={5}
            className={classes.chartWrapper}
            style={{ paddingLeft: "8px" }}
          >
            <Typography variant="h3" className={classes.sectionTitle}>
              Browsers
            </Typography>
            <PieChart
              data={browserChartData}
              innerRadius={0.7}
              padAngle={3}
              colors="set2"
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={5}
            className={classes.chartWrapper}
            style={{ paddingLeft: "8px" }}
          >
            <Typography variant="h3" className={classes.sectionTitle}>
              Languages
            </Typography>
            <PieChart
              data={languagesChartData}
              innerRadius={0.7}
              padAngle={3}
              colors="dark2"
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: "100px" }}
          className={classes.chartWrapper}
        >
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Geo Location
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            sm={8}
            style={{ marginTop: "24px", marginBottom: "48px" }}
          >
            <MapChart data={mapData} domain={[1, Math.ceil(record.Clicks) * 10]} />
          </Grid>
          <Grid item xs={10} sm={2}>
            <ol>{countryData && countryData.length > 0 &&
            (
              countryData.map((country, index) => {
                if(index > 5) return;
                return(
                  <li className={classes.listItem}>
                    {country.name}
                  </li>
                )
              })
            )}</ol>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  try {
    let url;
    if (typeof window === "undefined") {
      url = process.env.serverApiUrl + "/" + query.key;
    }
    url = process.env.apiURL + "/" + query.key;
    const res = await getStats(url);
    const record = res.record;
    return { props: { record } };
  } catch (err) {
    return { props: {} };
  }
}

export default Stats;
