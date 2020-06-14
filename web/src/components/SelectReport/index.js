import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import "./styles.css";

export default function SelectReport({
  times = [],
  quadros = [],
  handleBoard,
  handleTime,
}) {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");

  const handleSelectTime = (e) => {
    const time_id = e.target.value;
    setSelectedTeam(time_id);

    const time = times.find((time) => {
      return time.id === Number(time_id);
    });

    handleTime(time);
  };

  const handleSelectBoard = (e) => {
    const quadro_id = e.target.value;

    setSelectedBoard(quadro_id);

    const quadro = quadros.find((quadro) => {
      return quadro.id === Number(quadro_id);
    });

    handleBoard(quadro);
  };

  return (
    <div className="report">
      <div className="select-container">
        <div>
          <h3>Relatórios</h3>
          <span>Observe como o time está evoluindo</span>
        </div>
        <select
          className="select-time"
          value={selectedTeam}
          onChange={handleSelectTime}
        >
          <option className="item-default" defaultValue hidden>
            Selecione o time
          </option>
          {times.length === 0 && (
            <option disabled> Você participa de nenhum time. </option>
          )}
          {times.map((time) => (
            <option key={uuid()} className="time-item" value={time.id}>
              {time.name}
            </option>
          ))}
        </select>

        <select
          className="select-month"
          value={selectedBoard}
          onChange={handleSelectBoard}
        >
          <option className="item-default" defaultValue hidden>
            Selecione o quadro de tarefa
          </option>
          {times.length === 0 && (
            <option disabled> Você não participa de um time. </option>
          )}
          {times.length !== 0 && quadros.length === 0 && (
            <option disabled> Selecione previamente um time.</option>
          )}
          {quadros.map((quadro) => (
            <option key={uuid()} className="month-item" value={quadro.id}>
              {quadro.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
