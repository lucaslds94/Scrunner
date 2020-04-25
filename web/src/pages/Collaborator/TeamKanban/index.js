import React from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import "./styles.css";


import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import Kanban from "../../../components/Kanban";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";


function TeamKanban({
  boardTitle,
  boardDate
}) {
  return (
    <>
      <Header/>
      <MenuLateral homeActive= {false}/>
      <Container>
        <div className="colaborador-cards-header">
          <h1>Colocar nome</h1>
          <div className="colaborador-header-buttons">
            <ButtonChangeScreen titleButton={"Dailys"} />
            <ButtonChangeScreen titleButton={"Tarefas"}/>
            {/* Lembrar de linkar o botão tarefas */}
          </div>
        </div>
        <div className="teams-divider"/>
        <div className="boardInfo-container">
          <Link to ={""} ><MdArrowBack/> Voltar</Link>
        </div>
        <div 
        className="boardInfo"
        boardTitle = "NomeQuadro1"
        boardDate = "25/04/2020"
        >
          <h2>{boardTitle}</h2>
          <h4>Criado em {boardDate}</h4>
        </div>
        <Kanban/>
      </Container>
    </>
  );
}

export default TeamKanban;