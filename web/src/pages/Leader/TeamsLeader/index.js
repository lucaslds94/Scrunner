import React, { useState, useEffect } from "react";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import { Lottie } from "@crello/react-lottie";
import animTeamPage from "../../../assets/animations/team-page.json";

import api from "../../../services/api";

import { v4 as uuid } from "uuid";

import { useHistory } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

import { FaPlus } from "react-icons/fa";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTeam from "../../../components/CardTeam";
import ButtonAction from "../../../components/ButtonAction";
import Loading from "../../../components/Loading";

import ModalCriarTime from "../../../components/ModalCriarTime";

export default function TeamsLeader() {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    const fetchTeams = async () => {
      try {
        const response = await api.get(`/teams/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTeams(response.data.teams);
        setLoading(false);
        setLocalStorage("@Scrunner:token", response.data.token);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    if (history.location.state && history.location.state.delete) {
      toast.info("Time removido com sucesso.");
    }

    fetchTeams();
  }, [history]);

  const registerTeam = async ({ teamName, category }) => {
    setShowModalCreate(false);

    const token = getLocalStorage("@Scrunner:token");
    const { id } = getLocalStorage("@Scrunner:user");

    let data = {
      name: teamName,
      category: category,
    };

    try {
      const response = await api.post(`/teams/create/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let newTeam = {
        team: {
          id: response.data.team.id,
          name: teamName,
          category: category,
          code: response.data.team.code,
          users: [""],
        },
      };

      setTeams([...teams, newTeam]);

      toast.info(" Time criado com sucesso. ");
    } catch (error) {
      toast.error(" Erro ao criar o time. ");
    }
  };

  const toDetailPage = (teamId, teamName) => {
    history.push(`/times/detalhes/${teamName}`, { teamId });
  };

  return (
    <>
      {showModalCreate && (
        <ModalCriarTime
          handleModalCreate={() => setShowModalCreate(false)}
          registerTeam={registerTeam}
        />
      )}
      <div className="teamsLider">
        <Header />
        <MenuLateral homeActive={false} />
        {loading ? (
          <Loading />
        ) : (
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
              {teams.length === 0 && (
                <>
                  <Lottie
                    config={{
                      animationData: animTeamPage,
                      loop: true,
                      autoplay: true,
                    }}
                  />
                </>
              )}

              {teams.map((team) => (
                <CardTeam
                  key={uuid()}
                  teamName={team.team.name}
                  teamCategory={team.team.category}
                  teamCode={team.team.code}
                  teamMembers={team.team.users}
                  teamId={team.team.id}
                  toDetailPage={() =>
                    toDetailPage(team.team.id, team.team.name)
                  }
                  isOwner
                />
              ))}
            </div>
          </Container>
        )}
      </div>
      <ToastContainer limit={3}/>
    </>
  );
}
