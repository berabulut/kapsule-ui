import { getStats } from "api";
import { useEffect } from "react";

const Stats = ({ record }) => {
  useEffect(() => {
    console.log(record);
  }, []);
  return <p>Post: {record.Title}</p>;
};

export async function getServerSideProps({ query }) {
  const res = await getStats(query.key);
  const record = res.record;

  return { props: { record } };
}

export default Stats;
