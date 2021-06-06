import React from "react";
import Link from "next/link";
import { withTranslation } from "@./i18n";
import { footerStyles } from "./styles";
import { Grid, Typography } from "@material-ui/core";
import styles from "@./styles/Home.module.css";
import { GitHub, Twitter } from "@material-ui/icons";

const Footer = ({ t }) => {
  const classes = footerStyles();

  return (
    <div className={classes.root}>
      <div className={styles.footerContainer}>
        <Grid container xs={12} spacing={4} className={classes.container}>
          <Grid item container xs={5} sm={4}>
            <Grid item xs={12}>
              <Typography className={classes.title}>PROJECT</Typography>
            </Grid>
            <Grid item xs={12}>
              <Link href="/">
                <a>
                  <Typography className={classes.item}>About</Typography>
                </a>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="/">
                <a>
                  <Typography className={classes.item}>How it works</Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={5} sm={4}>
            <Grid item xs={12}>
              <Typography className={classes.title}>LEGAL</Typography>
            </Grid>
            <Grid item xs={12}>
              <Link href="/">
                <a>
                  <Typography className={classes.item}>
                    Terms of Service
                  </Typography>
                </a>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="/">
                <a>
                  <Typography className={classes.item}>Privacy</Typography>
                </a>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={5} sm={4} className={classes.iconContainer}>
            <div className={classes.icon}>
              <a
                href="https://twitter.com/berabulut"
                target="_blank"
                rel="noopener"
              >
                <Twitter style={{ fontSize: "1.75rem" }} />
              </a>
            </div>
            <div className={classes.icon}>
              <a
                href="https://github.com/berabulut/kapsule"
                target="_blank"
                rel="noopener"
              >
                <GitHub style={{ fontSize: "1.75rem" }} />
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withTranslation("footer")(Footer);