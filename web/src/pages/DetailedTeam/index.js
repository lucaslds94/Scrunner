import React from "react";
import { FaSlackHash as Hash  } from "react-icons/fa"

import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import Container from "../../components/Container";
import CardInformation from "../../components/CardInformation";

import TeamMembersList from "../../components/TeamMembersList";
import RoundGraph from "../../components/RoundGraph";

import "./styles.css";


export default function DetailedTeam() {
  return (
    <div className="detailedTeam">
      <Header />
      <MenuLateral />
      <Container>
        <div className="container-cards">
          <h1>Alpha</h1>
          <div className="divider" />
          <div className="cards-area">
            <CardInformation
              cardTitle="O código do time"
              subTitle="E256HJ"
              number={(<Hash size={22} />)}
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
        </div>
      
        <div className="colab-area">
          <TeamMembersList />
          <RoundGraph
            title="Tarefas"
            description="tarefas foram realizadas no total"
            complete={5}
            isPercent={false}
            total = {9}
          />
        </div>
      </Container>
    </div>
  );
}
