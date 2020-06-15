import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import "./styles.css";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import { useHistory } from "react-router-dom";
import moment from "moment";
import "moment/locale/pt-br";

import MenuLateral from "../../../components/MenuLateral";
import Header from "../../../components/Header";

import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";
import BurndownGraph from "../../../components/BurndownGraph";
import SelectReport from "../../../components/SelectReport";

import Loading from "../../../components/Loading";

export default function DashboardColab() {
  const [ReportDate, setReportDate] = useState([]);
  const [ReportPlanned, setReportPlanned] = useState([]);
  const [ReportCompleted, setReportCompleted] = useState([]);

  const [teams, setTeams] = useState([]);
  const [taskBoards, setTaskBoards] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const [teamCount, setTeamCount] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

  const history = useHistory();

  useEffect(() => {
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

        setTeams(response.data.graphs.burndown);

        setLocalStorage("@Scrunner:token", response.data.token);
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    fetchData();
  }, [history]);

  const handleBoard = (board) => {
    const dateRange = board.date_range.map((date, index) => {
      if (index !== 0) {
        return moment(date).format("DD/MM");
      }

      return date;
    });

    setReportDate(dateRange);
    setReportCompleted(board.remaining_points);
    setReportPlanned(board.planned_points);
  };

  const handleSelectTime = (team) => {
    setTaskBoards(team.task_boards);
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
          <div className="dashboard-colaborador-graph-area">
            <SelectReport
              times={teams}
              quadros={taskBoards}
              handleTime={handleSelectTime}
              handleBoard={handleBoard}
            />
            <BurndownGraph
              planned={ReportPlanned}
              DateRange={ReportDate}
              complete={ReportCompleted}
              isEmpty={teams.length === 0}
            />
          </div>
        </Container>
      )}
    </div>
  );
}
