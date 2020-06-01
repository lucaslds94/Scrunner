import React, { useState, useEffect } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import api from "../../../services/api";

import { useHistory } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";

import SelectReport from "../../../components/SelectReport";
import BurndownGraph from "../../../components/BurndownGraph";

import UsersList from "../../../components/UsersList";
import RoundGraph from "../../../components/RoundGraph";

import Loading from "../../../components/Loading";

export default function DashboardLeader() {
  const [MonthReport, setMonthReport] = useState(0);
  const [TimeReport, setTimeReport] = useState(0);
  const [ReportDate, setReportDate] = useState([]);
  const [ReportPlanned, setReportPlanned] = useState([]);
  const [ReportComplete, setReportComplete] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [colabCount, setColabCount] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);
  const [roundGraph, setRoundGraph] = useState(0);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    const fetchData = async () => {
      try {
        const response = await api.get(`/dashboard/owner/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCollaborators(response.data.usersInTeam);
        setColabCount(response.data.colabCount);
        setDoneTasksCount(response.data.doneTasksCount);
        setTeamsCount(response.data.teamCount);
        setRoundGraph(response.data.graphs.roundGraph);
        setLocalStorage("@Scrunner:token", response.data.token);
        setLoading(false);
        setUserName(user.name);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    fetchData();
  }, [history]);

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

  const removeUserTeam = async (collaboratorId, teamId) => {
    const token = getLocalStorage("@Scrunner:token");

    try {
      await api.delete(`/teams/exit/${teamId}/${collaboratorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let newCollaborators = collaborators.map((collaborator) => {
        if (collaborator.id !== collaboratorId) {
          return {
            ...collaborator,
          };
        }
        const teams = collaborator.teams.filter(
          (team) => Number(team.id) !== Number(teamId)
        );
        return {
          ...collaborator,
          teams,
        };
      });

      newCollaborators = newCollaborators.filter(
        (collaborator) => collaborator.teams.length !== 0
      );

      setCollaborators(newCollaborators);
      toast.info("Colaborador removido com sucesso");
    } catch (error) {
      toast.error("Erro ao remover o colaborador");
    }
  };

  return (
    <div className="dashboardLider">
      <Header />
      <MenuLateral />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div className="container-cards">
            <h1>Olá, {userName}.</h1>
            <div className="divider" />
            <div className="cards-area">
              <CardInformation
                cardTitle="Foram Criados"
                subTitle={teamsCount > 1 ? "Tarefas" : "Tarefa"}
                number={teamsCount}
                buttonText="Clique para visulizar os times"
                toPage={"/times"}
                isClickable
              />
              <CardInformation
                crown
                cardTitle="Possuem"
                subTitle={colabCount > 1 ? "Colaboradores" : "Colaborador"}
                number={colabCount}
                buttonText="Cadastrados em seus times"
              />
              <CardInformation
                cardTitle="Foram completadas"
                subTitle={doneTasksCount > 1 ? "Tarefas" : "Tarefa"}
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
              collaboratorsData={collaborators}
              removeUserTeam={removeUserTeam}
            />
            <RoundGraph
              title="Tarefas"
              description="do total de tarefas foram completadas"
              complete={roundGraph || 0}
            />
          </div>
        </Container>
      )}

      <ToastContainer limit={3}/>
    </div>
  );
}
