import React, { useState, useEffect } from "react";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import api from "../../../services/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory, Link } from "react-router-dom";

import "./styles.css";

import { MdArrowBack } from "react-icons/md";
import { FaHashtag as Hash, FaCog } from "react-icons/fa";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardInformation from "../../../components/CardInformation";
import Loading from "../../../components/Loading";

import TeamMembersList from "../../../components/TeamMembersList";
import RoundGraph from "../../../components/RoundGraph";

import ModalConfigTime from "../../../components/ModalConfigTime";

export default function DetailsTeamsLeader() {
  const [showModalConfig, setShowModalConfig] = useState(false);
  const [team, setTeam] = useState({});
  const [graph, setGraph] = useState({});
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (!!history.location?.state === false) {
      return history.push("/times");
    }

    const fetchTeam = async () => {
      try {
        const user = getLocalStorage("@Scrunner:user");
        const token = getLocalStorage("@Scrunner:token");
        const teamId = history.location.state.teamId;

        const response = await api.get(`/teams/details/${teamId}/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLocalStorage("@Scrunner:token", response.data.token);

        setGraph(response.data.graph);
        setTeam(response.data.team);

        let owner = response.data.team.users.find((user) => {
          return user.is_owner === true;
        });
        setOwnerName(owner.name);

        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    fetchTeam();
  }, [history]);

  const getLeaderName = () => {
    if (!loading && team.users) {
      const user = team.users.find((user) => {
        return user.is_leader && !user.is_owner;
      });

      if (user) {
        return { id: user.id, name: user.name };
      }
    }

    return { id: "", name: "" };
  };

  const updateTeam = async (newData) => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    try {
      const response = await api.put(
        `/teams/update/${team.id}/${user.id}`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTeam(response.data.team);
      setShowModalConfig(false);
      setLocalStorage("@Scrunner:token", response.data.token);

      toast.info("Time atualizado com sucesso.");
    } catch (err) {
      toast.error("Erro ao atualizar time.");
    }
  };

  const deleteTeam = async () => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    try {
      await api.delete(`/teams/delete/${team.id}/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowModalConfig(false);

      history.push("/times", { delete: true });
    } catch (err) {
      toast.error("Erro ao deletar time");
    }
  };

  const handleShowModalConfig = () => {
    setShowModalConfig(!showModalConfig);
  };

  const removeUserTeam = async (collaboratorId) => {
    const token = getLocalStorage("@Scrunner:token");

    try {
      await api.delete(`/teams/exit/${team.id}/${collaboratorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let newUsers = team.users.filter((user) => user.id !== collaboratorId);

      setTeam({ ...team, users: newUsers });
      toast.info("Colaborador removido com sucesso");
    } catch (error) {
      toast.error("Erro ao remover o colaborador");
    }
  };

  const handleCardClick = () => {
    let inputCopy = document.createElement("input");
    inputCopy.value = team.code;
    document.body.appendChild(inputCopy);
    inputCopy.select();
    try {
      document.execCommand("copy");
      toast.info("Código copiado.");
    } catch (err) {
      toast.error("Algum erro ocorreu ao tentar copiar o código.");
    }

    document.body.removeChild(inputCopy);
  };

  return (
    <>
      {showModalConfig && (
        <ModalConfigTime
          handleModalConfig={handleShowModalConfig}
          categoryTime={team.category}
          nameTime={team.name}
          members={team.users}
          leaderId={getLeaderName().id}
          leaderMember={getLeaderName().name}
          updateTeam={updateTeam}
          deleteTeam={deleteTeam}
        />
      )}
      <div className="detailedTeam">
        <Header />
        <MenuLateral homeActive={false} />
        {loading ? (
          <Loading />
        ) : (
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

              <div className="teamInfo-container">
                <Link className="backBtn" to={`/times`}>
                  <MdArrowBack size={30} color={"#737FF3"} /> Voltar
                </Link>

                <div className="teamInfo">
                  {ownerName && <p>Time criado por {ownerName}</p>}
                </div>
              </div>

              <div className="cards-area">
                <CardInformation
                  cardTitle="O código do time"
                  subTitle={team.code}
                  number={<Hash size={22} />}
                  buttonText="Clique para copiar o código"
                  isCopyable
                  copyCode={handleCardClick}
                />
                <CardInformation
                  crown
                  cardTitle="O time possui"
                  subTitle={team.users?.length - 1 > 1 ? "Membros" : "Membro"}
                  number={team.users?.length - 1}
                  buttonText="Visualize os membros do time abaixo."
                />
                <CardInformation
                  cardTitle="A categoria do time é"
                  subTitle={team.category}
                  isClickable
                  onClick={() => setShowModalConfig(true)}
                  buttonText="Clique para configurar o grupo"
                />
              </div>
            </div>

            <div className="colab-area">
              <TeamMembersList
                collaborators={team.users}
                removeUserTeam={removeUserTeam}
              />
              <RoundGraph
                title="Tarefas"
                description="tarefas foram realizadas no total"
                complete={graph.total_done_tasks}
                isPercent={false}
                total={graph.total_tasks}
              />
            </div>
          </Container>
        )}
        <ToastContainer limit={3} />
      </div>
    </>
  );
}
