import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";
import CardDailyLog from "../../../components/CardDailyLog";
import ModalCriarDaily from "../../../components/ModalCriarDaily";

import { MdArrowBack } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../../../utils/localStorage";

import isLeader from "../../../utils/isLeader";

import api from "../../../services/api";

import moment from "moment";
import "moment/locale/pt-br";

export default function DailyLog() {
  const [showModal, setShowModal] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const [leaderContent, setLeaderContent] = useState({});
  const [collaboratorContent, setCollaboratorContent] = useState([]);
  const [registeredDaily, setRegisteredDaily] = useState(false);

  const history = useHistory();
  const {
    teamId,
    teamName,
    boardId,
    boardDate,
    users,
  } = history.location.state;

  useEffect(() => {
    const user = getLocalStorage("@Scrunner:user");
    const token = getLocalStorage("@Scrunner:token");

    const fetchContent = async () => {
      const response = await api.get(
        `/dailys/boards/contents/${teamId}/${boardId}/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const [leaderContent] = response.data.dailyContents.filter(
        (daily) => daily.user.is_leader
      );

      const collaboratorContent = response.data.dailyContents.filter(
        (daily) => !daily.user.is_leader
      );

      const registeredDaily = response.data.dailyContents.find(
        (daily) => daily.user.id === user.id
      );

      setLeaderContent(leaderContent);
      setRegisteredDaily(!!registeredDaily);
      setCollaboratorContent(collaboratorContent);
      setDailyCount(response.data.dailyContents.length);

      setLocalStorage("@Scrunner:token", response.data.token);
      
    };

    fetchContent();
  }, []);

  const toTeamDailysPage = () => {
    history.push(`/times/daily/${teamName}`, { teamId, teamName, users });
  };

  return (
    <div className="dailyLog">
      {showModal && (
        <ModalCriarDaily handleModalCreateDaily={() => setShowModal(false)} />
      )}
      <Header />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="infos-daily">
          <div className="header-times-daily">
            <div className="header-titles">
              <h2>Dailys</h2>
              <span onClick={toTeamDailysPage}>{teamName}</span>
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

          <div className="dailyLogInfo-container">
            <div onClick={toTeamDailysPage} className="backBtn">
              <MdArrowBack size={30} color={"#737FF3"} /> Voltar
            </div>

            <div className="dailyLogInfo">
              <h2>{moment(boardDate).format("DD/MM/YYYY")}</h2>
              <h4>{dailyCount} registros foram realizados</h4>
            </div>
          </div>
        </div>

        <div className="dailyLog-content">
          <div className="dailyLog-leadText">
            {!registeredDaily && isLeader(users) && (
              <button
                onClick={() => setShowModal(true)}
                className="buttonAddDaily"
              >
                <FaPlus size={20} color={"#B2B2B2"} />
                <span> Adicionar registro daily </span>
              </button>
            )}

            {leaderContent?.user && (
              <CardDailyLog
              leader={true}
              didYesterday={leaderContent.did_yesterday}
              doToday={leaderContent.do_today}
              problems={leaderContent.problems}
              name={leaderContent.user.name}
              />
            )}
          </div>

          <div className="dailyLog-colabText">
            {!registeredDaily && !isLeader(users) && (
              <button
                onClick={() => setShowModal(true)}
                className="buttonAddDaily"
              >
                <FaPlus size={20} color={"#B2B2B2"} />
                <span> Adicionar registro daily </span>
              </button>
            )}
            {collaboratorContent.map((content) => (
              <CardDailyLog
                didYesterday={content.did_yesterday}
                doToday={content.do_today}
                problems={content.problems}
                name={content.user.name}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
