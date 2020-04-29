import React from "react";

import { Link } from "react-router-dom";

import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";

import "./styles.css";

export default function CardDaily({
  date,
  isComplete = false,
  yourDaily = false,
  leaderDaily = false,
  to = '#'
}) {
  return (
    <Link to={to} className="component-board-daily">
      <div className="board-daily-header">
        <h3>{date}</h3>
        {isComplete ? (
          <FaRegCheckCircle size={17} color={"#0BC984"} />
        ) : (
          <FaRegClock size={17} color={"#898989"} />
        )}
      </div>
      <div className="divider" />
      <div className="board-daily-body">
        <div className="board-register-daily">
          <p>Seu registro de Daily</p>
          <p>{yourDaily ? "Realizada" : "Pendente"}</p>
        </div>
        <div className="board-register-daily">
          <p>Registro pelo líder</p>
          <p>{leaderDaily ? "Disponível" : "Não Realizado"}</p>
        </div>
      </div>
    </Link>
  );
}
