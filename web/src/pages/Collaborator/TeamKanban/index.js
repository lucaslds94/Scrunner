import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import Kanban from "../../../components/Kanban";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";
import Loading from "../../../components/Loading";

import {
  clearLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "../../../utils/localStorage";

import api from "../../../services/api";

import moment from "moment";
import "moment/locale/pt-br";

export default function TeamKanban() {
  const [tasksColumns, setTasksColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const user = getLocalStorage("@Scrunner:user");

  const {
    teamId,
    users,
    teamName,
    boardId,
    boardName,
    boardDate,
  } = history.location.state;

  useEffect(() => {
    const fetchTasksColumns = async () => {
      const token = getLocalStorage("@Scrunner:token");

      try {
        const response = await api.get(
          `/tasks/contents/${teamId}/${boardId}/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setLocalStorage("@Scrunner:token", response.data.token);

        setTasksColumns(response.data.tasks);
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        history.push("/");
      }
    };

    fetchTasksColumns();
  }, [boardId, teamId, user.id, history]);

  const toTasksColabPage = () => {
    history.push(`/times/tarefas/${teamName}`, { teamName, users, teamId });
  };

  const toDetailTeamPage = () => {
    history.push(`/times/detalhes/${teamName}`, { teamId });
  };

  const toDailysPage = () => {
    history.push(`/times/daily/${teamName}`, { teamId, users, teamName });
  };

  return (
    <div className="containerKanbanTeam">
      <Header />
      <MenuLateral homeActive={false} />
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div className="colaborador-cards-header">
            <div className="bloco-header-titles">
              <p>Tarefas</p>
              <span onClick={toDetailTeamPage}>{teamName}</span>
            </div>
            <div className="colaborador-header-buttons">
              <ButtonChangeScreen
                titleButton={"Dailys"}
                toPage={toDailysPage}
              />
              <ButtonChangeScreen titleButton={"Tarefas"} active />
            </div>
          </div>
          <div className="teams-divider" />
          <div className="boardInfo-container">
            <div className="backBtn" onClick={toTasksColabPage}>
              <MdArrowBack size={30} color={"#737FF3"} /> Voltar
            </div>
            <div className="boardInfo">
              <h2>{boardName}</h2>
              <h4>Criado em {moment(boardDate).format("DD/MM/YYYY")}</h4>
            </div>
          </div>
          <Kanban tasksColumns={tasksColumns} />
        </Container>
      )}
    </div>
  );
}
