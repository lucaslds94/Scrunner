import React from "react";

import "./styles.css";

export default function TarefasInformation({
  title,
  date,
}) {
  return (
    <div className="card-tarefa">
      <div className="card-information-tarefa">
        <p className="card-title-tarefa">{title}</p>
        <div className="divider" />
        <p className="card-textdate-tarefa">Data de criação</p>
        <p>
          <strong>{date}</strong>
        </p>
      </div>
    </div>
  );
}
