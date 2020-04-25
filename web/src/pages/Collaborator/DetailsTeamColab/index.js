import React from "react";
import { useParams } from "react-router-dom";

import "./styles.css";

import { FaHashtag as Hash } from "react-icons/fa";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";

import RoundGraph from "../../../components/RoundGraph";
import MembersList from "../../../components/MembersList";

export default function DetailsTeamColab() {
  let { name } = useParams();

  return (
    <div className="colaborador-detalhes-time">
      <Header userName={"Ana Fonseca"} />
      <MenuLateral isLeader={false} homeActive={false} />

      <Container>
        <div className="colaborador-container-cards">
          <div className="colaborador-cards-header">
            <h1>{name}</h1>
            <div className="colaborador-header-buttons">
              <ButtonChangeScreen
                titleButton={"Dailys"}
                to={`/times/colaborador/daily/${name}`}
              />
              <ButtonChangeScreen
                titleButton={"Tarefas"}
                to={`/times/colaborador/tarefa/${name}`}
              />
            </div>
          </div>
          <div className="divider" />
          <div className="colaborador-area-cards">
            <CardInformation
              cardTitle="O código do time"
              subTitle="E256HJ"
              number={<Hash size={22} />}
              buttonText="Clique para copiar o código"
            />
            <CardInformation
              crown
              cardTitle="O time possui"
              subTitle="Membros"
              number={8}
              buttonText="Visualize os membros do time abaixo."
            />
            <CardInformation
              cardTitle="A categoria do time é"
              subTitle="Desenvolvimento"
              buttonText="Clique para configurar o grupo"
            />
          </div>
          <div className="colaborador-graph-area">
            <MembersList
              users={[
                { id: 1, name: "Heisenberg", isLeader: true },
                { id: 2, name: "Heisenberg", isLeader: false },
                { id: 3, name: "Heisenberg", isLeader: false },
                { id: 4, name: "Heisenberg", isLeader: false },
                { id: 5, name: "Heisenberg", isLeader: false },
                { id: 6, name: "Heisenberg", isLeader: false },
                { id: 7, name: "Heisenberg", isLeader: false },
                { id: 8, name: "Heisenberg", isLeader: false },
              ]}
            />
            <RoundGraph
              title="Tarefas"
              description="Tarefas foram realizadas no total"
              isPercent={false}
              total={9}
              complete={5}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
