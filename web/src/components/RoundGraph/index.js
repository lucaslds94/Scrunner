import React from "react";
import Chart from "react-apexcharts";

import "./styles.css";

export default function RoundGraph({
  isPercent = true,
  complete = 0,
  total,
  title,
  description,
}) {
  
  const caculatePercent = (total, complete) => {
    let result = (complete * 100) / total;

    return result;
  };

  const OPTIONS_GRAPH = {
    series: [isPercent ? complete : caculatePercent(total, complete)],
    options: {
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
          },
          track: {
            background: "#B2B2B2",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true,
              fontSize: "35px",
              fontWeight: "bold",
              color: "#737FF3",
              formatter: (val) => (isPercent ? `${val}%` : complete),
            },
          },
        },
      },
      colors: ["#737FF3"],
      stroke: {
        lineCap: "round",
      },
    },
  };

  return (
    <div className="graph-container">
      <h3 className="graph-title">{title}</h3>
      <div className="graph">
        <Chart
          options={OPTIONS_GRAPH.options}
          series={OPTIONS_GRAPH.series}
          type="radialBar"
          width={300}
        />
      </div>
      <p className="graph-description">{description}</p>
    </div>
  );
}