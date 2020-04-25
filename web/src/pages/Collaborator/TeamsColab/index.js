import React, { useState } from "react";

import "./styles.css";

import { FiLogIn } from "react-icons/fi";

import Header from "../../../components/Header";
import MenuLaretal from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTeam from "../../../components/CardTeam";
import ButtonAction from "../../../components/ButtonAction";

import ModalEntrarTime from "../../../components/ModalEntrarTime";

export default function TeamsColab() {
  const [showModalEnterTeam, setShowModalEnterTeam] = useState(false);

  return (
    <>
      {showModalEnterTeam && (
        <ModalEntrarTime
          handleModalEnterTeam={() => setShowModalEnterTeam(false)}
        />
      )}
      <div className="teamsColaborador">
        <Header userName="Ana Fonseca" />
        <MenuLaretal isLeader={false} homeActive= {false}/>
        <Container>
          <div className="container-title">
            <h1> Times </h1>
            <ButtonAction
              onClick={() => setShowModalEnterTeam(!showModalEnterTeam)}
              ButtonText="Entrar em time"
              ButtonIcon={FiLogIn}
            />
          </div>
          <div className="teams-divider"></div>

          <div className="container-teams">
            <CardTeam
              isLeader={false}
              teamName="Alpha"
              teamCategory="Desenvolvimento"
              teamCode="E98H36"
              teamMembers={[
                { id: 1, nome: "Ana Fonseca" },
                { id: 2, nome: "José Afonso" },
                { id: 3, nome: "Lucas" },
                { id: 4, nome: "Lucas" },
              ]}
            />
            <CardTeam
              isLeader={false}
              teamName="Ômega"
              teamCategory="UX/UI"
              teamCode="U18F57"
              teamMembers={[
                { id: 1, nome: "Ana Fonseca" },
                { id: 2, nome: "José Afonso" },
                { id: 3, nome: "Lucas" },
                { id: 4, nome: "Lucas" },
              ]}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
