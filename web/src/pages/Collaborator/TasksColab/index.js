import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTask from "../../../components/CardTask";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";
import Loading from "../../../components/Loading";
import CreateBoard from "../../../components/CreateBoard";
import ModalCreateBoardTask from "../../../components/ModalCreateBoardTask";

import { MdArrowBack } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../services/api";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";
import isLeader from "../../../utils/isLeader";

import { Lottie } from "@crello/react-lottie";
import animEmptyTeamList from "../../../assets/animations/emptyTeamList.json";

import { v4 as uuid } from "uuid";

export default function TasksColab() {
  const [taskBoards, setTaskBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leader, setLeader] = useState(false);
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);

  const history = useHistory();
  const user = getLocalStorage("@Scrunner:user");

  useEffect(() => {
    if (!!history.location?.state === false) {
      return history.push("/times");
    }

    const { teamId, users } = history.location.state;

    const fetchBoards = async () => {
      const token = getLocalStorage("@Scrunner:token");

      try {
        const response = await api.get(`/tasks/boards/${teamId}/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userIsLeader = isLeader(users);

        setLeader(userIsLeader);

        setTaskBoards(response.data.boards);
        setLocalStorage("@Scrunner:token", response.data.token);
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    fetchBoards();
  }, [history, user.id]);

  const toDailyPage = () => {
    const { teamId, users, teamName } = history.location.state;
    history.push(`/times/daily/${teamName}`, { teamId, users, teamName });
  };

  const toDetailsTeamPage = () => {
    const { teamId, teamName } = history.location.state;
    history.push(`/times/detalhes/${teamName}`, { teamId });
  };

  const toKanbanPage = (boardId, boardName, boardDate) => {
    const { teamId, users, teamName } = history.location.state;
    history.push(`/times/kanban/${teamName}/${boardName}/`, {
      teamId,
      boardId,
      users,
      teamName,
      boardName,
      boardDate,
    });
  };

  const createBoard = async (data) => {
    const { teamId } = history.location.state;
    const token = getLocalStorage("@Scrunner:token");

    try {
      const response = await api.post(
        `/tasks/boards/${teamId}/${user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTaskBoards([response.data.board, ...taskBoards]);
      setShowModalCreateTask(false);
      setLocalStorage("@Scrunner:token", response.data.token);

      toast.success("Quadro criado com sucesso.");
    } catch (err) {
      toast.error("Algum erro interno ocorreu.");
    }
  };

  const deleteBoard = async (boardId) => {
    const { teamId } = history.location.state;
    const token = getLocalStorage("@Scrunner:token");

    try {
      await api.delete(`/tasks/boards/${teamId}/${boardId}/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredBoards = taskBoards.filter((board) => boardId !== board.id);

      setTaskBoards(filteredBoards);

      toast.success("Quadro removido com sucesso.");
    } catch (error) {
      toast.error("Algum erro interno ocorreu.");
    }
  };

  return (
    <>
      {showModalCreateTask && (
        <ModalCreateBoardTask
          handleCloseModal={() => setShowModalCreateTask(false)}
          createBoard={createBoard}
        />
      )}
      <div className="colaborador-tarefa">
        <Header />
        <MenuLateral homeActive={false} />

        <Container>
          <div className="container-bloco-tarefa">
            <div className="bloco-header-tarefa">
              <div className="bloco-header-titles">
                <p>Tarefas</p>
                <span onClick={toDetailsTeamPage}>
                  {history.location?.state?.teamName}
                </span>
              </div>
              <div className="colaborador-header-buttons">
                <ButtonChangeScreen
                  titleButton={"Dailys"}
                  toPage={toDailyPage}
                />
                <ButtonChangeScreen titleButton={"Tarefas"} active />
              </div>
            </div>
            <div className="divider" />

            <div className="teamInfo-container">
              <div className="backBtn" onClick={toDetailsTeamPage}>
                <MdArrowBack size={30} color={"#737FF3"} /> Voltar
              </div>
            </div>

            <div className="bloco-tarefa">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {history.location?.state?.users && leader && (
                    <CreateBoard
                      handleCreateBoard={() => setShowModalCreateTask(true)}
                    />
                  )}
                  {!leader && taskBoards.length === 0 && (
                    <div className="animation-empty-tasks">
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
                  {taskBoards.map((taskBoard) => (
                    <CardTask
                      key={uuid()}
                      title={taskBoard.name}
                      date={taskBoard.createdAt}
                      dateRange={taskBoard.date_range}
                      isLeader={leader}
                      toPage={() =>
                        toKanbanPage(
                          taskBoard.id,
                          taskBoard.name,
                          taskBoard.createdAt
                        )
                      }
                      deleteTaskBoard={() => deleteBoard(taskBoard.id)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </Container>
        <ToastContainer limit={3} />
      </div>
    </>
  );
}
