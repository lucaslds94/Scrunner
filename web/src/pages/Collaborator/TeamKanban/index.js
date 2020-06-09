import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import Kanban from "../../../components/Kanban";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";

export default function TeamKanban() {
  const { boardTitle, name } = useParams();
  const history = useHistory();

  const { teamId, users, teamName, boardId } = history.location.state;

  const toTasksColabPage = () => {
    history.push(`/times/tarefas/${teamName}`, { teamName, users, teamId });
  };

  return (
    <div className="containerKanbanTeam">
      <Header />
      <MenuLateral homeActive={false} />
      <Container>
        <div className="colaborador-cards-header">
          <div className="bloco-header-titles">
            <p>Tarefas</p>
            <span onClick={toTasksColabPage}>{name}</span>
          </div>
          <div className="colaborador-header-buttons">
            <ButtonChangeScreen
              titleButton={"Dailys"}
              to={`/times/daily/${name}`}
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
            <h2>{boardTitle}</h2>
            <h4>Criado em DATA AQUI</h4>
          </div>
        </div>
        <Kanban />
      </Container>
    </div>
  );
}
