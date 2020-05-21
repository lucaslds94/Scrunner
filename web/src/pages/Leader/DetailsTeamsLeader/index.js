import React, { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";

import api from "../../../services/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom";

import "./styles.css";

import { FaHashtag as Hash, FaCog } from "react-icons/fa";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";

import TeamMembersList from "../../../components/TeamMembersList";
import RoundGraph from "../../../components/RoundGraph";

import ModalConfigTime from "../../../components/ModalConfigTime";

export default function DetailsTeamsLeader() {
  const [showModalConfig, setShowModalConfig] = useState(false);
  const [team, setTeam] = useState({});
  const [graph, setGraph] = useState({});
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchTeam = async () => {
      const user = getLocalStorage("@Scrunner:user");
      const token = getLocalStorage("@Scrunner:token");
      const teamId = history.location.state.teamId;

      const response = await api.get(`/teams/details/${teamId}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLocalStorage("@Scunner:token", response.data.token);

      setGraph(response.data.graph);
      setTeam(response.data.team);

      setLoading(false);
    };

    fetchTeam();
  }, [history.location.state.teamId]);

  const handleShowModalConfig = () => {
    setShowModalConfig(!showModalConfig);
  };

  const removeUserTeam = async (colaboratorId) => {
    const token = getLocalStorage("@Scrunner:token");

    try {
      await api.delete("/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user_id: colaboratorId,
          team_id: team.id,
        },
      });

      let newUsers = team.users.filter((user) => user.id !== colaboratorId);

      setTeam({ ...team, users: newUsers });
      toast.info("Colaborador removido com sucesso");
    } catch (error) {
      toast.error("Erro ao remover o colaborador");
    }
  };

  return (
    <>
      {showModalConfig && (
        <ModalConfigTime handleModalConfig={handleShowModalConfig} />
      )}
      <div className="detailedTeam">
        <Header />
        <MenuLateral homeActive={false} />
        <Container>
          <div className="container-cards">
            <div className="container-card-header">
              <h1>{team.name}</h1>
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
                subTitle={team.code}
                number={<Hash size={22} />}
                buttonText="Clique para copiar o código"
              />
              <CardInformation
                crown
                cardTitle="O time possui"
                subTitle="Membros"
                number={team.users && team.users.length - 1}
                buttonText="Visualize os membros do time abaixo."
              />
              <CardInformation
                cardTitle="A categoria do time é"
                subTitle={team.category}
                buttonText="Clique para configurar o grupo"
              />
            </div>
          </div>

          <div className="colab-area">
            <TeamMembersList
              colaborators={team.users}
              removeUserTeam={removeUserTeam}
            />
            {!loading && (
              <RoundGraph
                title="Tarefas"
                description="tarefas foram realizadas no total"
                complete={graph.total_done_tasks}
                isPercent={false}
                total={graph.total_tasks}
              />
            )}
          </div>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
