import React, { useState } from "react";

import "./styles.css";

import { FiLogIn } from "react-icons/fi";

import Header from "../../../components/Header";
import MenuLaretal from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTeam from "../../../components/CardTeam";
import ButtonAction from "../../../components/ButtonAction";

import ModalEntrarTime from "../../../components/ModalEntrarTime";

import { useHistory } from "react-router-dom";

export default function TeamsColab() {
  const [showModalEnterTeam, setShowModalEnterTeam] = useState(false);
  const history = useHistory();


  const toDetailPage = (teamId, teamName) => {
    history.push(`/times/detalhes/${teamName}`, {teamId});
  }



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
                { id: 1, name: "Ana Fonseca", is_owner: true },
                { id: 2, name: "José Afonso" },
                { id: 3, name: "Lucas" },
                { id: 4, name: "Lucas" },
              ]}
            />
            <CardTeam
              isLeader={false}
              teamName="Ômega"
              teamCategory="UX/UI"
              teamCode="U18F57"
              toDetailPage={() => toDetailPage(1, "omega")}
              teamMembers={[
                { id: 1, name: "Ana Fonseca" },
                { id: 2, name: "José Afonso" },
                { id: 3, name: "Lucas", is_owner: true },
                { id: 4, name: "Lucas" },
              ]}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
