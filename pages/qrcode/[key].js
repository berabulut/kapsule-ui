import { useEffect, useState } from "react";
import { getStats } from "api";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Tabs, Tab, Box } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import QRCode from "qrcode.react";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
  paper: {
    [theme.breakpoints.up("lg")]: {
      width: "25%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "30%",
    },
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "55%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  downloadButton: {
    marginTop: "50px",
    color: "white",
    backgroundColor: "#00ADB5",
  },
  title: {
    marginTop: "96px",
    marginBottom: "32px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "64px",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, url, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <QRCode value={url} style={{ height: "156px", width: "156px" }} />
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const QR = () => {
  const router = useRouter();
  const classes = useStyles();
  const { key } = router.query;

  const [url, setUrl] = useState(" ");
  const [realURL, setRealURL] = useState("");
  const [title, setTitle] = useState("");
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const download = () => {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement("a"),
      e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = key;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = document
      .getElementsByTagName("canvas")[0]
      .toDataURL("image/png;base64");

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        true,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );

      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  };

  useEffect(() => {
    if (!key) return;
    if (process.env.prod === "true") {
      setUrl(
        window.location.origin + "/" + process.env.redirectingURL + "/" + key
      );
      return;
    }
    setUrl(process.env.redirectingURL + "/" + key);
  }, []);

  useEffect(() => {
    async function fetchURL() {
      const response = await getStats(process.env.apiURL + "/" + key);
      setRealURL(response.record.Value);
      setTitle(response.record.Title);
    }
    fetchURL();
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      <Paper className={classes.paper} square>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
          variant="fullWidth"
        >
          <Tab label="ORIGINAL" {...a11yProps(0)} />
          <Tab label="SHORTENED" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={tab} url={realURL} index={0} />
      <TabPanel value={tab} url={url} index={1} />
      <Button
        variant="contained"
        size="medium"
        className={classes.downloadButton}
        endIcon={<ArrowDownwardIcon />}
        onClick={download}
      >
        Download
      </Button>
    </div>
  );
};

export default QR;
