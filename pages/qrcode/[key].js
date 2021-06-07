import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import QRCode from "qrcode.react";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
  qrcode: {
    marginTop: "128px",
  },
  downloadButton: {
    marginTop: "50px",
	color: "white",
	backgroundColor: "#00ADB5",
  },
}));

const QR = () => {
  const router = useRouter();
  const classes = useStyles();
  const { key } = router.query;

  const [url, setUrl] = useState(" ");

  const download = () => {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement("a"),
      e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = "test.png";

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
    if (process.env.prod) {
      setUrl(
        window.location.origin + "/" + process.env.redirectingURL + "/" + key
      );
      return;
    }
    setUrl(process.env.redirectingURL + "/" + key);
  }, []);

  return (
    <div className={classes.container}>
      <QRCode
        className={classes.qrcode}
        value={url}
        style={{ height: "156px", width: "156px" }}
      />
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
