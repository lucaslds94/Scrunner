import React from "react";
import { useParams, Link } from "react-router-dom";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTask from "../../../components/CardTask";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";

// Numero 2 da linha 28 referente ao id do time

export default function TasksColab() {
  let { name } = useParams();

  return (
    <div className="colaborador-tarefa">
      <Header userName={"Ana Fonseca"} />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="container-bloco-tarefa">
          <div className="bloco-header-tarefa">
            <div className="bloco-header-titles">
              <p>Tarefas</p>
              <Link to={`/times/detalhes/2/${name}`}>{name}</Link>
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
