import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import CardTask from "../../../components/CardTask";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";
import Loading from "../../../components/Loading";

import { MdArrowBack } from "react-icons/md";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../../services/api";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import {v4 as uuid} from 'uuid';

export default function TasksColab() {
  const [taskBoards, setTaskBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  let { name } = useParams();
  const history = useHistory();
  const { teamId } = history.location.state;

  useEffect(() => {
    const fetchBoards = async () => {
      const user = getLocalStorage("@Scrunner:user");
      const token = getLocalStorage("@Scrunner:token");

      try {
        const response = await api.get(`/tasks/boards/${teamId}/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTaskBoards(response.data.boards);
        setLocalStorage("@Scrunner:token", response.data.token);
        setLoading(false);
      } catch (error) {
        clearLocalStorage();
        history.push("/", { error: 1 });
      }
    };

    fetchBoards();
  }, [history, teamId]);

  return (
    <div className="colaborador-tarefa">
      <Header />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="container-bloco-tarefa">
          <div className="bloco-header-tarefa">
            <div className="bloco-header-titles">
              <p>Tarefas</p>
              <Link to={`/times/detalhes/${name}`}>{name}</Link>
            </div>
            <div className="colaborador-header-buttons">
              <ButtonChangeScreen
                titleButton={"Dailys"}
                to={`/times/daily/${name}`}
              />
              <ButtonChangeScreen
                titleButton={"Tarefas"}
                to={`/times/tarefa/${name}`}
                active
              />
            </div>
          </div>
          <div className="divider" />

          <div className="teamInfo-container">
            <Link className="backBtn" to={`/times/detalhes/${name}`}>
              <MdArrowBack size={30} color={"#737FF3"} /> Voltar
            </Link>
          </div>

          <div className="bloco-tarefa">
            {loading ? (
              <Loading />
            ) : (
              taskBoards.map((taskBoard) => (
                <CardTask
                  key={uuid()}
                  title={taskBoard.name}
                  date={taskBoard.createdAt}
                  dateRange={taskBoard.date_range}
                  to={`/times/kanban/${name}/NomeQuadro1/10-04-2020`}
                />
              ))
            )}
          </div>
        </div>
      </Container>
      <ToastContainer limit={3} />
    </div>
  );
}
