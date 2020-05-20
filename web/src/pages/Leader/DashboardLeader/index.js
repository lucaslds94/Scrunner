import React, { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";

import api from "../../../services/api";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";

import SelectReport from "../../../components/SelectReport";
import BurndownGraph from "../../../components/BurndownGraph";

import UsersList from "../../../components/UsersList";
import RoundGraph from "../../../components/RoundGraph";

export default function DashboardLeader() {
  const [MonthReport, setMonthReport] = useState(0);
  const [TimeReport, setTimeReport] = useState(0);
  const [ReportDate, setReportDate] = useState([]);
  const [ReportPlanned, setReportPlanned] = useState([]);
  const [ReportComplete, setReportComplete] = useState([]);
  const [colaborators, setColaborators] = useState([]);
  const [colabCount, setColabCount] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);
  const [roundGraph, setRoundGraph] = useState(0);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    const fetchData = async () => {
      const response = await api.get(`/dashboard/leader/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setColaborators(response.data.usersInTeam);
      setColabCount(response.data.colabCount);
      setDoneTasksCount(response.data.doneTasksCount);
      setTeamsCount(response.data.teamCount);
      setRoundGraph(response.data.graphs.roundGraph);
      setLocalStorage("@Scrunner:token", response.data.token);

      setUserName(user.name);
    };

    fetchData();
  }, []);

  const handleSelectTime = (time) => {
    setTimeReport(time);
    console.log(TimeReport);
  };

  const handleSelectMonth = (month) => {
    setMonthReport(month, generateReportDate(month));
    console.log(MonthReport);
  };

  const generateReportDate = (month) => {
    const dateRange = [15, 18, 21, 24, 27, 30];

    const planned = [80, 64, 48, 32, 16, 0];

    const complete = [80, 50, 20, 10, 5, 0];

    setReportDate(dateRange);
    setReportPlanned(planned);
    setReportComplete(complete);
  };

  const removeUserTeam = async (colaboratorId, teamId) => {
    const token = getLocalStorage("@Scrunner:token");

    try {
      const response = await api.delete("/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user_id: colaboratorId,
          team_id: teamId,
        },
      });

      let newColaborators = colaborators.map((colaborator) => {
        if (colaborator.id === colaboratorId) {
          const teams = colaborator.teams.filter(
            (team) => Number(team.id) !== Number(teamId)
          );

          if (teams.length !== 0) {
            return {
              ...colaborator,
              teams,
            };
          }
        } else {
          return {
            ...colaborator,
          };
        }
      });

      newColaborators = newColaborators.filter((newColab) => newColab);

      setColaborators(newColaborators);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="dashboardLider">
      <Header />
      <MenuLateral />
      <Container>
        <div className="container-cards">
          <h1>Olá, {userName}.</h1>
          <div className="divider" />
          <div className="cards-area">
            <CardInformation
              cardTitle="Foram Criados"
              subTitle="Times"
              number={teamsCount}
              buttonText="Clique para visulizar os times"
            />
            <CardInformation
              crown
              cardTitle="Possuem"
              subTitle="Colaboradores"
              number={colabCount}
              buttonText="Cadastrados na plataforma"
            />
            <CardInformation
              cardTitle="Foram completadas"
              subTitle="Tarefas"
              number={doneTasksCount}
              buttonText="Somando todos os times"
            />
          </div>
        </div>
        <div className="container-report">
          <SelectReport
            handleMonth={handleSelectMonth}
            handleTime={handleSelectTime}
            times={[
              { name: "Alfa", value: 1 },
              { name: "Beta", value: 2 },
            ]}
          />
          <BurndownGraph
            DateRange={ReportDate}
            planned={ReportPlanned}
            complete={ReportComplete}
          />
        </div>
        <div className="colab-area">
          <UsersList
            colaboratorsData={colaborators}
            removeUserTeam={removeUserTeam}
          />
          <RoundGraph
            title="Tarefas"
            description="do total de tarefas foram completadas"
            complete={roundGraph}
          />
        </div>
      </Container>
    </div>
  );
}
