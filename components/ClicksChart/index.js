import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import styles from "@./styles/Stats.module.css";

const ClicksChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!props.data) return;
    if (props.data[0].data.length === 1) {
      // adding another day to record if there is only one day of record
      let x = props.data[0].data[0].x;

      x = parseInt(x[0]) + 1 + x.slice(1, x.length);

      props.data[0].data.push({
        x: x,
        y: 0,
      });
      setData(props.data);
      return;
    }
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    // console.log(data)
    // console.log(props.data)
  }, [data])

  return (
    <div
      style={{ width: "100%", height: "400px" }}
      className={styles.container}
    >
      <ResponsiveLine
        data={data}
        colors={{ scheme: "paired" }}
        lineWidth={2.5}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: 10,
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
          format: (e) => Math.floor(e) === e && e,
        }}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ClicksChart;
