import React, { useState } from "react";
import { FaSlackHash as Hash, FaCog } from "react-icons/fa";

import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import Container from "../../components/Container";
import CardInformation from "../../components/CardInformation";

import TeamMembersList from "../../components/TeamMembersList";
import RoundGraph from "../../components/RoundGraph";

import ModalConfigTime from "../../components/ModalConfigTime";

import "./styles.css";

export default function DetailedTeam() {
  const [showModalConfig, setShowModalConfig] = useState(false);

  const handleShowModalConfig = () => {
    setShowModalConfig(!showModalConfig);
  };

  return (
    <>
      {showModalConfig && (
        <ModalConfigTime handleModalConfig={handleShowModalConfig} />
      )}
      <div className="detailedTeam">
        <Header />
        <MenuLateral />
        <Container>
          <div className="container-cards">
            <div className="container-card-header">
              <h1>Alpha</h1>
              <button
                onClick={handleShowModalConfig}
                className="button-config-time"
              >
                <FaCog size={22} color={"#B2B2B2"} />
              </button>
            </div>
            <div className="divider" />
            <div className="cards-area">
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
          </div>

          <div className="colab-area">
            <TeamMembersList />
            <RoundGraph
              title="Tarefas"
              description="tarefas foram realizadas no total"
              complete={5}
              isPercent={false}
              total={9}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
