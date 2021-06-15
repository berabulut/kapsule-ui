import { Grid } from "@material-ui/core";
import { Email, Twitter } from "@material-ui/icons";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <Grid container className={styles.cardContainer}>
        <Grid item xs={12} sm={5} className={styles.card}>
          <Email className={styles.icon} />
          <a href="mailto:kapsule.click@gmail.com" className={styles.link}>
            kapsule.click@gmail.com
          </a>
        </Grid>
        <Grid item xs={12} sm={5} className={styles.card}>
          <Twitter className={styles.icon} />
          <a
            href="https://twitter.com/berabulut"
            target="_blank"
            rel="noopener"
            className={styles.link}
          >
            twitter.com/berabulut
          </a>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
