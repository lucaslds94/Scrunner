import React from "react";
import { useParams, Link } from "react-router-dom";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTask from "../../../components/CardTask";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";

import { MdArrowBack } from "react-icons/md";


export default function TasksColab() {
  let { name } = useParams();

  return (
    <div className="colaborador-tarefa">
      <Header />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="container-bloco-tarefa">
          <div className="bloco-header-tarefa">
            <div className="bloco-header-titles">
              <p>Tarefas</p>
              <Link to={`/times/detalhes/${name}`}>{name}</Link>
            </div>
            <div className="colaborador-header-buttons">
              <ButtonChangeScreen
                titleButton={"Dailys"}
                to={`/times/daily/${name}`}
              />
              <ButtonChangeScreen
                titleButton={"Tarefas"}
                to={`/times/tarefa/${name}`}
                active
              />
            </div>
          </div>
          <div className="divider" />

          <div className="teamInfo-container">

            <Link className ="backBtn" to={`/times/detalhes/${name}`} >
                <MdArrowBack size={30} color={"#737FF3"}/> Voltar
            </Link>

          </div>

          <div className="bloco-tarefa">
            <CardTask 
              title="NomeQuadro1" 
              date="10/04/2020" 
              to={`/times/kanban/${name}/NomeQuadro1/10-04-2020`}
              />
            <CardTask 
              title="NomeQuadro2" 
              date="10/04/2020" 
              to={`/times/kanban/${name}/NomeQuadro2/10-04-2020`}
            />
            <CardTask 
              title="NomeQuadro3" 
              date="10/04/2020" 
              to={`/times/kanban/${name}/NomeQuadro3/10-04-2020`}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
