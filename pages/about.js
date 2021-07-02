import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>What is it?</h1>
      <p className={styles.text}>
        It's a free URL shortener service with some statistics.
      </p>
      <h1 className={styles.statTitle}>Statistics</h1>
      <div className={styles.statContainer}>
        <h2 className={styles.subTitle}>Click History</h2>
        <div className={styles.imageContainer}>
          <img alt="click history" style={{ width: "100%" }} src="/static/images/history.webp" />
        </div>
      </div>
      <div className={styles.statContainer}>
        <h2 className={styles.subTitle}>Geo Locations</h2>
        <div className={styles.imageContainer}>
          <img alt="world map" style={{ width: "100%" }} src="/static/images/location.webp" />
        </div>
      </div>
      <div className={styles.statContainer}>
        <h2 className={styles.subTitle}>Operating System Names</h2>
        <div className={styles.smallImageContainer}>
          <img alt="operating systems pie chart" style={{ width: "100%" }} src="/static/images/os.webp" />
        </div>
      </div>
      <div className={styles.statContainer}>
        <h2 className={styles.subTitle}>Device Types</h2>
        <div className={styles.smallImageContainer}>
          <img alt="devices pie chart" style={{ width: "100%" }} src="/static/images/device.webp" />
        </div>
      </div>
      <div className={styles.statContainer}>
        <h2 className={styles.subTitle}>Browser Names</h2>
        <div className={styles.smallImageContainer}>
          <img alt="browsers pie chart" style={{ width: "100%" }} src="/static/images/browser.webp" />
        </div>
      </div>
      <div className={styles.statContainer}>
        <h2 className={styles.subTitle}>Languages</h2>
        <div className={styles.smallImageContainer}>
          <img alt="languages pie chart" style={{ width: "100%" }} src="/static/images/language.webp" />
        </div>
      </div>
    </div>
  );
};

export default About;
