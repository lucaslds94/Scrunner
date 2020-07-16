import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";
import CardDaily from "../../../components/CardDaily";
import CreateBoard from "../../../components/CreateBoard";
import Loading from "../../../components/Loading";

import { MdArrowBack } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Lottie } from "@crello/react-lottie";
import animEmptyTeamList from "../../../assets/animations/emptyTeamList.json";

import api from "../../../services/api";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import isLeader from "../../../utils/isLeader";

export default function DailyColab() {
  const [dailyBoards, setDailyBoards] = useState([]);
  const [leader, setLeader] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (!!history.location?.state === false) {
      return history.push("/times");
    }

    const { teamId, users } = history.location.state;

    const fetchBoards = async () => {
      const user = getLocalStorage("@Scrunner:user");
      const token = getLocalStorage("@Scrunner:token");

      const response = await api.get(`/dailys/boards/${teamId}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userIsLeader = isLeader(users);

      setLeader(userIsLeader);
      setDailyBoards(response.data.boards);

      setLocalStorage("@Scrunner:token", response.data.token);
      setLoading(false);
    };

    fetchBoards();
  }, [history]);

  const toDetailsTeamPage = () => {
    const { teamId, teamName } = history.location.state;
    history.push(`/times/detalhes/${teamName}`, { teamId });
  };

  const toTasksPage = () => {
    const { teamId, teamName, users } = history.location.state;
    history.push(`/times/tarefas/${teamName}`, { teamId, users, teamName });
  };

  const handleCreateBoard = async () => {
    const { teamId } = history.location.state;
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    try {
      const response = await api.post(
        `/dailys/boards/${teamId}/${user.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newBoard = response.data.board;

      setDailyBoards([newBoard, ...dailyBoards]);
      setLocalStorage("@Scrunner:token", response.data.token);

      toast.success("Quadro criado com sucesso");
    } catch (error) {
      if (error.response?.status === 409) {
        return toast.info("Você já criou um quadro hoje");
      }

      toast.error("Aconteceu um erro inesperado");
    }
  };

  const deleteDailyBoard = async (boardId) => {
    const { teamId } = history.location.state;
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    try {
      await api.delete(`/dailys/boards/${teamId}/${boardId}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newBoards = dailyBoards.filter(
        (dailyBoard) => dailyBoard.id !== boardId
      );

      setDailyBoards(newBoards);

      toast.info("Quadro removido com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado");
    }
  };

  const toDailyLogPage = (boardId, boardDate) => {
    const { teamId, teamName, users } = history.location.state;
    history.push(`/times/dailylog/${teamName}`, {
      teamId,
      teamName,
      boardId,
      boardDate,
      users,
    });
  };

  return (
    <div className="detalhes-times-daily">
      <Header />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="header-times-daily">
          <div className="header-titles">
            <h2>Dailys</h2>
            <span onClick={toDetailsTeamPage}>
              {history.location?.state?.teamName}
            </span>
          </div>
          <div className="header-buttons">
            <ButtonChangeScreen titleButton={"Dailys"} active />
            <ButtonChangeScreen titleButton={"Tarefas"} toPage={toTasksPage} />
          </div>
        </div>
        <div className="divider" />
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="teamInfo-container">
              <div onClick={toDetailsTeamPage} className="backBtn">
                <MdArrowBack size={30} color={"#737FF3"} /> Voltar
              </div>
            </div>

            <div className="container-boards">
              {history.location?.state?.users && leader && (
                <CreateBoard handleCreateBoard={handleCreateBoard} />
              )}
              {!leader && dailyBoards.length === 0 && (
                <div className="animation-empty-dailys">
                  <Lottie
                    width={450}
                    height={450}
                    config={{
                      animationData: animEmptyTeamList,
                      loop: false,
                      autoplay: true,
                    }}
                  />
                </div>
              )}
              {dailyBoards.map((dailyBoard) => (
                <CardDaily
                  key={uuid()}
                  date={dailyBoard.createdAt}
                  isComplete={dailyBoard.daily_contents.your_daily}
                  leaderDaily={dailyBoard.daily_contents.leader_daily}
                  yourDaily={dailyBoard.daily_contents.your_daily}
                  deleteDailyBoard={() => deleteDailyBoard(dailyBoard.id)}
                  isLeader={leader}
                  toPage={() =>
                    toDailyLogPage(dailyBoard.id, dailyBoard.createdAt)
                  }
                />
              ))}
            </div>
          </>
        )}
      </Container>

      <ToastContainer limit={3} />
    </div>
  );
}
