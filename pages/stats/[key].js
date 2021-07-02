import { useEffect, useState } from "react";
import { getStats } from "api";
import {
  Typography,
  Grid,
  IconButton,
  Fade,
  Paper,
  Popper,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import ClicksChart from "@./components/ClicksChart";
import PieChart from "@./components/PieChart";
import MapChart from "@./components/MapChart";
import DetailsCard from "@./components/DetailsCard";
import Custom404 from "../404";
import styles from "@./styles/Home.module.css";
import { parseTimeStamp } from "@./helpers/date";
import {
  browserStatistics,
  deviceStatistics,
  osStatistics,
  languageStatistics,
} from "@./helpers/userAgent";
import { mapStatistics, countryStatistics } from "@./helpers/map";

const useStyles = makeStyles((theme) => ({
  mainText: {
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    fontSize: "3.5rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: "48px",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0px",
      marginTop: "32px",
      fontSize: "2.5rem",
    },
  },
  detailsWrapper: {
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-around",
    },
  },
  clicksText: {
    fontWeight: "800",
    fontSize: "2.25rem",
    paddingTop: "24px",
    fontFamily: "Lato",
    textAlign: "center",
  },
  counterText: {
    color: "#00ADB5",
    textAlign: "center",
    fontSize: "5rem",
    fontWeight: "400",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontFamily: "Lato",
  },
  chartWrapper: {
    marginTop: "100px",
    justifyContent: "space-evenly",
    boxShadow: "0px 4px 12px rgb(0 0 0 / 5%)",
    [theme.breakpoints.down("md")]: {
      marginTop: "45px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "65px",
      justifyContent: "space-evenly",
    },
  },
  mapWrapper: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  },
  clicksWrapper: {
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  sectionTitle: {
    fontWeight: "600",
    fontFamily: "Lato",
    fontSize: "1.5rem",
    marginTop: "28px",
    paddingLeft: "24px",
  },
  listItem: {
    fontSize: "1.7rem",
    fontWeight: "300",
    color: "#808080",
    fontFamily: "Lato",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  infoContainer: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  infoText: {
    fontWeight: 600,
    color: "#222831",
    marginTop: "96px",
    fontSize: "2.5rem",
    textAlign: "center",
    letterSpacing: "-0.01562em",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0px",
      marginTop: "32px",
      paddingLeft: "16px",
      paddingRight: "16px",
      fontSize: "1.75rem",
    },
  },
  infoButton: {
    transform: "scale(1.25)",
    marginLeft: "32px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
    },
  },
  popupText: {
    padding: "8px 16px",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  paper: {
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      margin: "auto",
    },
  },
}));

const Stats = ({ record }) => {
  const classes = useStyles();

  const [clicksChartData, setClicksChartData] = useState();
  const [devicesChartData, setDevicesChartData] = useState([]);
  const [browserChartData, setBrowserChartData] = useState([]);
  const [osChartData, setOSChartData] = useState([]);
  const [languagesChartData, setLanguagesChartData] = useState([]);
  const [mapData, setMapData] = useState();
  const [countryData, setCountryData] = useState();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    if (!record) return;
    if (!record.Visits) return;

    let arr = [
      {
        id: "clicks",
        color: "rgb(0, 173, 181)",
        data: [],
      },
    ];

    arr[0].data = record.Visits.map((visit) => {
      return {
        x: parseTimeStamp(visit.Date),
        y: visit.Clicks,
      };
    });

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

    if (record.Visits.length > 5) {
      arr[0].data = arr[0].data.slice(
        arr[0].data.length - 5,
        arr[0].data.length
      );
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

  const handleInfoButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenInfo(!openInfo);
  };

  if (!record) {
    return <Custom404 />;
  }

  return (
    <div className={styles.detailsContainer}>
      <main
        className={styles.main}
        style={{ paddingTop: "0px", marginTop: "32px" }}
      >
        <Typography className={classes.mainText} variant="h1" component="h2">
          All Time Statistics
        </Typography>
        {/* DETAILS - TOTAL CLICKS */}
        <Grid container className={classes.detailsWrapper}>
          {/* DETAILS */}
          <Grid item xs={11} sm={7} className={classes.chartWrapper}>
            <DetailsCard record={record} />
          </Grid>
          {/* TOTAL CLICKS */}
          <Grid
            item
            xs={11}
            sm={4}
            className={classes.chartWrapper}
            style={{ padding: "16px" }}
          >
            <div className={classes.clicksWrapper}>
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
            </div>
          </Grid>
        </Grid>
        {record.Clicks > 0 ? (
          <>
            <Grid container className={classes.chartWrapper}>
              <Typography variant="h3" className={classes.sectionTitle}>
                History
              </Typography>
              <ClicksChart data={clicksChartData} />
            </Grid>
            {/* OS - DEVICES */}
            <Grid container style={{ justifyContent: "space-around" }}>
              {/* OS */}
              <Grid
                item
                xs={11}
                md={5}
                className={classes.chartWrapper}
                style={{ paddingLeft: "8px" }}
              >
                <Typography variant="h3" className={classes.sectionTitle}>
                  OS
                </Typography>
                <PieChart
                  data={osChartData}
                  innerRadius={0}
                  colors="category10"
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                    },
                  ]}
                />
              </Grid>
              {/* DEVICES */}
              <Grid
                item
                xs={11}
                md={5}
                className={classes.chartWrapper}
                style={{ paddingLeft: "8px" }}
              >
                <Typography variant="h3" className={classes.sectionTitle}>
                  Devices
                </Typography>
                <PieChart
                  data={devicesChartData}
                  innerRadius={0}
                  colors="accent"
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                    },
                  ]}
                />
              </Grid>
            </Grid>
            {/* BROWSERS - LANGUAGES */}
            <Grid container style={{ justifyContent: "space-around" }}>
              {/* BROWSERS */}
              <Grid
                item
                xs={11}
                md={5}
                className={classes.chartWrapper}
                style={{ paddingLeft: "8px" }}
              >
                <Typography variant="h3" className={classes.sectionTitle}>
                  Browsers
                </Typography>
                <PieChart
                  data={browserChartData}
                  innerRadius={0.7}
                  padAngle={1}
                  colors="set2"
                  legends={false}
                />
              </Grid>
              {/* LANGUAGES */}
              <Grid
                item
                xs={11}
                md={5}
                className={classes.chartWrapper}
                style={{ paddingLeft: "8px" }}
              >
                <Typography variant="h3" className={classes.sectionTitle}>
                  Languages
                </Typography>
                <PieChart
                  data={languagesChartData}
                  innerRadius={0.7}
                  padAngle={1}
                  colors="dark2"
                />
              </Grid>
            </Grid>
            {/* GEO LOCATION */}
            {mapData && mapData.length > 0 && (
              <Grid container className={classes.chartWrapper}>
                <Grid item xs={12}>
                  <Typography
                    variant="h3"
                    className={classes.sectionTitle}
                    style={{ marginBottom: "14px", textAlign: "center" }}
                  >
                    Geo Location
                  </Typography>
                </Grid>
                <Grid item container className={classes.mapWrapper}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={9}
                    style={{ marginTop: "24px", marginBottom: "48px" }}
                  >
                    <MapChart
                      data={mapData}
                      domain={[1, Math.ceil(record.Clicks) * 10]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <ol>
                      {countryData &&
                        countryData.length > 0 &&
                        countryData.map((country, index) => {
                          if (index > 5) return;
                          return (
                            <li className={classes.listItem}>{country.name}</li>
                          );
                        })}
                    </ol>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <>
            <Grid container>
              <Grid item xs={12} className={classes.infoContainer}>
                <Typography className={classes.infoText}>
                  No other stats to show
                </Typography>
                <IconButton
                  className={classes.infoButton}
                  aria-label="info"
                  onClick={handleInfoButtonClick}
                >
                  <HelpOutline />
                </IconButton>
              </Grid>
            </Grid>
            <Popper
              open={openInfo}
              anchorEl={anchorEl}
              placement="bottom"
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper className={classes.paper}>
                    <Typography className={classes.popupText}>
                      Try clicking shortened link then reload this page.
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </>
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  try {
    let url = process.env.apiURL + "/" + query.key;
    if (typeof window === "undefined") {
      url = process.env.serverApiUrl + "/" + query.key;
    }
    const res = await getStats(url);
    const record = res.record;
    return { props: { record } };
  } catch (err) {
    return { props: {} };
  }
}

export default Stats;
