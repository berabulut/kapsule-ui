import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data, colors, innerRadius, padAngle }) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsivePie
        data={data}
        colors={{ scheme: colors }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={innerRadius}
        padAngle={padAngle ? padAngle : 0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}

        arcLabelsTextColor="#ffffff"
        motionConfig="slow"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: -80,
            translateY: 56,
            itemsSpacing: 30,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
