import React from "react";
import { Link , useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import "./styles.css";


import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import Kanban from "../../../components/Kanban";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";


export default function TeamKanban() {
  const {boardTitle, name, boardDate} = useParams();
  
  return (
    <div className="containerKanbanTeam">
      <Header userName = {"Ana Fonseca"}/>
      <MenuLateral homeActive= {false} />
      <Container>
        <div className="colaborador-cards-header">
          <div className="bloco-header-titles">
            <p>Tarefas</p>
            <Link to={`/times/detalhes/2/${name}`}>{name}</Link>
          </div>
          <div className="colaborador-header-buttons">
            <ButtonChangeScreen titleButton={"Dailys"} to= {`/times/daily/${name}`}/>
            <ButtonChangeScreen titleButton={"Tarefas"} active/>
          </div>
        </div>
        <div className="teams-divider"/>
        <div className="boardInfo-container">
          <Link className ="backBtn" to ={`/times/tarefa/${name}`} >
            <MdArrowBack size={30} color={"#737FF3"}/> Voltar
          </Link>
          <div 
          className="boardInfo"
          >
            <h2>{boardTitle}</h2>
            <h4>Criado em {boardDate}</h4>
          </div>
        </div>
        <Kanban/>
      </Container>
    </div>
  );
}
