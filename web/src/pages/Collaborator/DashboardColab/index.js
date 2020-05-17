import React, { useState, useEffect } from "react";

import "./styles.css";

import { getLocalStorage } from "../../../utils/localStorage";

import MenuLateral from "../../../components/MenuLateral";
import Header from "../../../components/Header";

import undraw_remotely from "../../../assets/undraw_remotely.png";

import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";
import BurndownGraph from "../../../components/BurndownGraph";

export default function DashboardColab() {
  const [ReportDate, setReportDate] = useState([]);
  const [ReportPlanned, setReportPlanned] = useState([]);
  const [ReportComplete, setReportComplete] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    generateReportDate();
    const user = getLocalStorage('@Scrunner:user');

    setUserName(user.name);
    
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
      <Header />
      <MenuLateral />

      <Container>
        <div className="colaborador-container-cards">
        <h1>Olá, {userName}.</h1>
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
              crown
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
