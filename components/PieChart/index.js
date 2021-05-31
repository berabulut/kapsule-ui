import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data, colors, innerRadius, padAngle, legends }) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsivePie
        data={data}
        colors={{ scheme: colors }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={innerRadius}
        padAngle={padAngle ? padAngle : 0.7}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={4}
        theme={{
          fontFamily: "Poppins",
        }}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsDiagonalLength={13}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
        arcLinkLabels
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
        legends={
          legends === false
            ? []
            : legends
            ? [
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 44,
                  itemsSpacing: 5,
                  itemWidth: 85,
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
              ]
            : [
                {
                  anchor: "top-left",
                  direction: "column",
                  justify: false,
                  translateX: -70,
                  translateY: 56,
                  itemsSpacing: 5,
                  itemWidth: 90,
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
              ]
        }
      />
    </div>
  );
};

export default PieChart;
