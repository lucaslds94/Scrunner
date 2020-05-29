import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import "./styles.css";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import { useHistory } from "react-router-dom";

import MenuLateral from "../../../components/MenuLateral";
import Header from "../../../components/Header";

import undraw_remotely from "../../../assets/undraw_remotely.png";

import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";
import BurndownGraph from "../../../components/BurndownGraph";
import Loading from "../../../components/Loading";

export default function DashboardColab() {
  const [ReportDate, setReportDate] = useState([]);
  const [ReportPlanned, setReportPlanned] = useState([]);
  const [ReportComplete, setReportComplete] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const [teamCount, setTeamCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const history = useHistory();

  useEffect(() => {
    generateReportDate();
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    setUserName(user.name);

    const fetchData = async () => {
      try {
        const response = await api.get(`/dashboard/collaborator/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTeamCount(response.data.teamCount);
        setDailyCount(response.data.dailyCount);
        setTaskCount(response.data.taskCount);

        setLocalStorage("@Scrunner:token", response.data.token);
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    fetchData();
  }, [history]);

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
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div className="colaborador-container-cards">
            <h1>Olá, {userName}.</h1>
            <div className="colaborador-divider" />
            <div className="colaborador-cards-area">
              <CardInformation
                cardTitle="Você está em"
                subTitle={teamCount > 1 ? "Times" : "Time"}
                number={teamCount}
                buttonText="Clique para visualizar os times"
                isClickable
                toPage={"/times"}
              />
              <CardInformation
                cardTitle="Você registrou"
                subTitle={dailyCount > 1 ? "Dailys" : "Daily"}
                number={dailyCount}
                buttonText="no total"
                crown
              />
              <CardInformation
                cardTitle="Você criou"
                subTitle={taskCount > 1 ? "Tarefas" : "Tarefa"}
                number={taskCount}
                buttonText="no total"
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
      )}
    </div>
  );
}
