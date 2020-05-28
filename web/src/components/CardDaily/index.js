import React from "react";

import { FaRegCheckCircle, FaRegClock } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

import "./styles.css";

import moment from "moment";
import 'moment/locale/pt-br';

export default function CardDaily({
  date,
  isComplete = false,
  yourDaily = false,
  leaderDaily = false,
  toPage,
  deleteDailyBoard
}) {
  return (
    <div onClick={toPage} className="component-board-daily">
      <div className="board-daily-header">
        <h3>{moment(date).format('DD/MM')}</h3>
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
        <div  onClick={deleteDailyBoard} className="board-daily-trash-button">
          <BsTrash size={25} color={'#BBB'} />
        </div>
      </div>
    </div>
  );
}
