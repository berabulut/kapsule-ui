import { getStats } from "api";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClicksChart from "@/components/ClicksChart";
import styles from "@./styles/Home.module.css";
import { data } from "@./data";

const useStyles = makeStyles({
  mainText: {
    fontWeight: 600,
    color: "#222831",
    marginBottom: "16px",
    fontSize: "3.5rem",
  },
});

const Stats = ({ record }) => {
  const classes = useStyles();

  useEffect(() => {
    console.log(record);
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main} style={{ paddingTop: "40px" }}>
        <Typography className={classes.mainText} variant="h1" component="h2">
          All Time Statistics
        </Typography>
        <p>Post: {record.Title}</p>
        <div>
          <ClicksChart data={data}/>
        </div>
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
