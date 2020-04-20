import React, { useState, useEffect } from "react";

import "./styles.css";

import MenuLateral from "../../components/MenuLateral";
import Header from "../../components/Header";

import undraw_remotely from "../../assets/undraw_remotely.png";

import Container from "../../components/Container";
import CardInformation from "../../components/CardInformation";
import BurndownGraph from "../../components/BurndownGraph";

export default function DashboardColaborador() {
  const [ReportDate, setReportDate] = useState([]);
  const [ReportPlanned, setReportPlanned] = useState([]);
  const [ReportComplete, setReportComplete] = useState([]);

  useEffect(() => {
    generateReportDate();
  }, []);

  const generateReportDate = () => {
    let month = "06";

    const dateRange = [
      `06/${month}`,
      `13/${month}`,
      `20/${month}`,
      `27/${month}`,
    ];

    const planned = [
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
    ];

    const complete = [
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
      `${Math.floor(Math.random() * (100 - 20) + 20)}`,
    ];

    setReportDate(dateRange);
    setReportPlanned(planned);
    setReportComplete(complete);
  };

  return (
    <div className="dashboard-colaborador">
      <Header userName="Ana Fonseca" />
      <MenuLateral isLeader={false} />

      <Container>
        <div className="colaborador-container-cards">
          <h1>Olá, Ana Fonseca!</h1>
          <div className="colaborador-divider" />
          <div className="colaborador-cards-area">
            <CardInformation
              cardTitle="Você está em"
              subTitle="Times"
              number={3}
              buttonText="Clique para visualizar os times"
            />
            <CardInformation
              cardTitle="Você registrou"
              subTitle="Dailys"
              number={10}
              buttonText="No total"
            />
            <CardInformation
              cardTitle="Você completou"
              subTitle="Tarefas"
              number={21}
              buttonText="No total"
            />
          </div>
        </div>
        <div className="colaborador-graph-area">
          <BurndownGraph
            planned={ReportPlanned}
            complete={ReportComplete}
            DateRange={ReportDate}
          />
          <div className="colaborador-image-area">
            <img src={undraw_remotely} alt="Remotely Work" />
          </div>
        </div>
      </Container>
    </div>
  );
}
