import React from "react";
import { useParams, Link } from "react-router-dom";

import "./styles.css";

import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import Container from "../../components/Container";
import TarefasInformation from "../../components/TarefasInformation";
import ButtonChangeScreen from "../../components/ButtonChangeScreen";

// Numero 2 da linha 28 referente ao id do time

export default function DetalhesTimeColaborador() {
  let { name } = useParams();

  return (
    <div className="colaborador-tarefa">
      <Header userName={"Ana Fonseca"} />
      <MenuLateral isLeader={false} homeActive= {false} />

      <Container>
        <div className="container-bloco-tarefa">
          <div className="bloco-header-tarefa">
            <div className="bloco-header-titles">
              <p>Tarefas</p>
              <Link to={`/times/detalhes/2/${name}/colaborador`} >{name}</Link>
            </div>
            <div className="colaborador-header-buttons">
              <ButtonChangeScreen titleButton={"Dailys"} />
              <ButtonChangeScreen titleButton={"Tarefas"} active />
            </div>
          </div>
          <div className="divider" />
          <div className="bloco-tarefa">
          <TarefasInformation
              title = "NomeQuadro1"
              date = "10/04/2020"
            />
          <TarefasInformation
              title = "NomeQuadro2"
              date = "10/04/2020"
            />
          <TarefasInformation
              title = "NomeQuadro3"
              date = "10/04/2020"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
