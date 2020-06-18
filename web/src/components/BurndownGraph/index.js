import React from "react";

import Chart from "react-apexcharts";
import Tooltip from "../ToolTip";

import { FiAlertCircle } from "react-icons/fi";

import { Lottie } from "@crello/react-lottie";
import emptyGraph from "../../assets/animations/emptyGraph.json";

import "./styles.css";

export default function BurndownGraph({
  planned = [],
  complete = [],
  DateRange = [],
  isEmpty = false,
}) {
  const OPTIONS_GRAPH = {
    series: [
      {
        name: "Pontos médios ideais",
        data: planned,
      },
      {
        name: "Pontos a serem realizados",
        data: complete,
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      markers: {
        size: 5,
      },
      colors: ["#ACB4FF", "#87B36F"],
      title: {
        text: `Gráfico de Burndown`,
        align: "left",
        style: {
          fontSize: 20,
          color: "#595959",
          fontFamily: "Roboto",
          fontWeight: "bold",
        },
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: DateRange,
        title: {
          text: "Tempo",
          style: {
            fontSize: 17,
            fontFamily: "Roboto",
            color: "#595959",
            fontWeight: "bold",
          },
        },
        labels: {
          style: {
            fontSize: 14,
            fontFamily: "Roboto",
            color: "#595959",
            fontWeight: "bold",
          },
        },
      },
      yaxis: {
        title: {
          text: "Demanda",
          style: {
            fontSize: 16,
            fontFamily: "Roboto",
            color: "#595959",
            fontWeight: "bold",
          },
        },
        labels: {
          style: {
            fontSize: 14,
            fontFamily: "Roboto",
            color: "#595959",
            fontWeight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="burndown-area">
      <div className="burndown-graph">
        {isEmpty ? (
          <Lottie
            width={800}
            height={300}
            style={{ margin: "30px" }}
            speed={0.8}
            config={{
              animationData: emptyGraph,
              loop: false,
              autoplay: true,
            }}
          />
        ) : (
          <>
            <Chart
              options={OPTIONS_GRAPH.options}
              series={OPTIONS_GRAPH.series}
              type="line"
              height={280}
              width={1024}
            />
            <div className="burndown-tooltip">
              <Tooltip
                width={"280px"}
                className="burndown-tooltip"
                title="É uma representação gráfica das tarefas a serem feitas ao longo da sprint, sendo útil para prever quando todo o trabalho será concluído."
              >
                <FiAlertCircle size={20} />
              </Tooltip>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
