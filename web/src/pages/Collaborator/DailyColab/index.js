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

import { MdArrowBack } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../services/api";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage";
import isLeader from "../../../utils/isLeader";

export default function DailyColab() {
  const [dailyBoards, setDailyBoards] = useState([]);

  const history = useHistory();
  const { teamId, teamName, users } = history.location.state;

  useEffect(() => {
    const fetchBoards = async () => {
      const user = getLocalStorage("@Scrunner:user");
      const token = getLocalStorage("@Scrunner:token");

      const response = await api.get(`/dailys/boards/${teamId}/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDailyBoards(response.data.boards);

      setLocalStorage("@Scrunner:token", response.data.token);
    };

    fetchBoards();
  }, [history, teamId]);

  const toDetailsTeamPage = () => {
    history.push(`/times/detalhes/${teamName}`, { teamId });
  };

  const handleCreateBoard = async () => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    try {
      const response = await api.post(
        `/dailys/boards/${teamId}/${user.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newBoard = response.data.board;

      setDailyBoards([...dailyBoards, newBoard]);
      setLocalStorage("@Scrunner:token", response.data.token);

      toast.info("Quadro criado com sucesso");
    } catch (error) {
      if (error.response?.status === 409) {
        return toast.info("Você já criou um quadro hoje");
      }

      toast.error("Aconteceu um erro inesperado");
    }
  };

  const deleteDailyBoard = async (boardId) => {
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

      toast.info("Quadro deletado com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado");
    }
  };

  return (
    <div className="detalhes-times-daily">
      <Header />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="header-times-daily">
          <div className="header-titles">
            <h2>Dailys</h2>
            <span onClick={toDetailsTeamPage}>{teamName}</span>
          </div>
          <div className="header-buttons">
            <ButtonChangeScreen
              titleButton={"Dailys"}
              to={`/times/daily/${teamName}`}
              active
            />
            <ButtonChangeScreen
              titleButton={"Tarefas"}
              to={`/times/tarefa/${teamName}`}
            />
          </div>
        </div>
        <div className="divider" />

        <div className="teamInfo-container">
          <div onClick={toDetailsTeamPage} className="backBtn">
            <MdArrowBack size={30} color={"#737FF3"} /> Voltar
          </div>
        </div>

        <div className="container-boards">
          {users && isLeader(users) && (
            <CreateBoard handleCreateBoard={handleCreateBoard} />
          )}
          {dailyBoards.map((dailyBoard) => (
            <CardDaily
              key={uuid()}
              date={dailyBoard.createdAt}
              isComplete={dailyBoard.daily_contents.your_daily}
              leaderDaily={dailyBoard.daily_contents.leader_daily}
              yourDaily={dailyBoard.daily_contents.your_daily}
              deleteDailyBoard={() => deleteDailyBoard(dailyBoard.id)}
            />
          ))}
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}
