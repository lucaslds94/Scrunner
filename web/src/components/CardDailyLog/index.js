import React from "react";

import { FaCrown } from "react-icons/fa";
import "./styles.css";

export default function CardDailyLog({
  leader = false,
  didYesterday = " ",
  doToday = " ",
  problems = " ",
  name = " ",
}) {
  return (
    <div className="cardDailyLog-container">
      <div className="dailyLog-header">
        <div className="userAvatar avatarLog"></div>
        <p> {name} </p>
        {leader && (
          <span className="LeaderCrown">
            <FaCrown size={20} color={"#B2B2B2"} />
          </span>
        )}
      </div>

      <div className="dailyLog-body">
        <div className="answer-container">
          <div className="answer-blocks">
            <span> • O que você fez ontem? </span>
            <p> {didYesterday} </p>
          </div>

          <div className="answer-blocks">
            <span> • O que você irá fazer hoje? </span>
            <p> {doToday} </p>
          </div>

          <div className="answer-blocks">
            <span> • Existe/existiu algum impedimento no seu caminho? </span>
            <p> {problems} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
