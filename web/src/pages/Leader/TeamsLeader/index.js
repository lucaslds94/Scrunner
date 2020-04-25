import React, { useState } from "react";

import "./styles.css";

import { FaPlus } from "react-icons/fa";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTeam from "../../../components/CardTeam";
import ButtonAction from "../../../components/ButtonAction";

import ModalCriarTime from "../../../components/ModalCriarTime";

export default function TeamsLeader() {
  const [showModalCreate, setShowModalCreate] = useState(false);

  return (
    <>
      {showModalCreate && (
        <ModalCriarTime handleModalCreate={() => setShowModalCreate(false)} />
      )}
      <div className="teamsLider">
        <Header />
        <MenuLateral homeActive= {false}/>
        <Container>
          <div className="container-title">
            <h1> Times </h1>
            <ButtonAction
              onClick={() => setShowModalCreate(!showModalCreate)}
              ButtonText="Criar Time"
              ButtonIcon={FaPlus}
            />
          </div>
          <div className="teams-divider"></div>

          <div className="container-teams">
            <CardTeam
              teamName="Alpha"
              teamCategory="Development"
              teamCode="E98H36"
              teamMembers={[
                { id: 1, nome: "Ana Fonseca" },
                { id: 2, nome: "José Afonso" },
                { id: 3, nome: "Lucas" },
                { id: 4, nome: "Lucas" },
              ]}
            />
            <CardTeam />
            <CardTeam />
          </div>
        </Container>
      </div>
    </>
  );
}
