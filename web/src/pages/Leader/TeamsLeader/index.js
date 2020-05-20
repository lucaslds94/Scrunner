import React, { useState, useEffect } from "react";

import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import api from "../../../services/api";

import { v4 as uuid } from "uuid";

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
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    const fetchTeams = async () => {
      const response = await api.get(`/teams/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTeams(response.data.teams);

      setLocalStorage("@Scrunner:token", response.data.token);
    };

    fetchTeams();
  }, []);

  return (
    <>
      {showModalCreate && (
        <ModalCriarTime handleModalCreate={() => setShowModalCreate(false)} />
      )}
      <div className="teamsLider">
        <Header />
        <MenuLateral homeActive={false} />
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
            {teams.map((team) => (
              <CardTeam
                key= {uuid()}
                teamName={team.team.name}
                teamCategory={team.team.category}
                teamCode={team.team.code}
                teamMembers={team.team.users}
                teamId={team.team.id}
                isOwner
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
