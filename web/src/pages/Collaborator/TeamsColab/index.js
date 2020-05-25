import React, { useState, useEffect } from "react";

import api from '../../../services/api';

import { getLocalStorage, setLocalStorage, clearLocalStorage } from "../../../utils/localStorage";

import { useHistory } from "react-router-dom";

import { v4 as uuid } from "uuid";

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
  const [teams, setTeams] = useState([]);

  const history = useHistory();

  const toDetailPage = (teamId, teamName) => {
    history.push(`/times/detalhes/${teamName}`, { teamId });
  }

  useEffect(() => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    const fetchData = async () => {
      try {
        const response = await api.get(`/teams/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTeams(response.data.teams);

        setLocalStorage('@Scrunner:token', response.data.token);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    }
    fetchData();

  }, [])

  return (
    <>
      {showModalEnterTeam && (
        <ModalEntrarTime
          handleModalEnterTeam={() => setShowModalEnterTeam(false)}
        />
      )}
      <div className="teamsColaborador">
        <Header />
        <MenuLaretal homeActive={false} />
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
            {teams.map(team => (
              <CardTeam
                key={uuid()}
                teamName={team.team.name}
                teamCategory={team.team.category}
                teamCode={team.team.code}
                teamMembers={team.team.users}
                teamId={team.team.id}
                toDetailPage={() => toDetailPage(team.team.id, team.team.name)}
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
