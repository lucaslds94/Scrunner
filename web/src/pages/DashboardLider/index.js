import React from "react";

import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import Container from "../../components/Container";
import CardInformation from "../../components/CardInformation";

import "./styles.css";

export default function DashboardLider() {
  return (
    <div className="dashboardLider">
      <Header />
      <MenuLateral />
      <Container>
        <div className="container-cards">
          <h1>Olá, Estevan Gomes!</h1>
          <div className="divider" />
          <div className="cards-area">
            <CardInformation
              cardTitle="Foram Criados"
              subTitle="Times"
              number={3}
              buttonText="Clique para visulizar os times"
            />
            <CardInformation
              crown
              cardTitle="Possuem"
              subTitle="Colaboradores"
              number={16}
              buttonText="Cadastrados na plataforma"
            />
            <CardInformation
              cardTitle="Foram completados"
              subTitle="Tarefas"
              number={21}
              buttonText="Somando todos os times"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
