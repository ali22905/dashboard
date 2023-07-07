import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../themes";
import { mockBarData as data } from "../data/mockData";


const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          text: {
            fill: colors.grey[100]
          }
        }
      }}
      keys={["hot dog", "burger", "kebab", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
        {
          "id": "dots-pattern",
          "type": "patternDots",
          "size": 2.8,
          "padding": 3,
          "stagger": true,
          "background": "inherit",
          "color": "#38bcb2"
        },
      ]}
      fill={[
        {
          match: {
            id: 'hot dog'
          },
          id: 'dots-pattern'
        },
        {
          match: {
            id: 'kebab'
          },
          id: "lines",
        }
      ]}

      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["brighter", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      tooltip={ e => (
        <div style={{padding: '10px', backgroundColor: colors.grey[900], width: '95px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '2.5px'}}>
          <div style={{
          width: '20px', 
          height: '100%', 
          backgroundColor: 
          e.id === 'hot dog' ? '#c8a88f' : 
          e.id === 'donut' ? '#c89336' :
          e.id === 'burger' ? '#d36858':
          e.id === 'kebab' ? '#d0c354' : 'white', 
          color: 'transparent'
          }}>.</div>
          <p style={{margin: 0}}>{e.id}</p>
        </div>
      ) }
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
  );
};

export default BarChart;