import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function CardTask({
  title,
  date,
  to = '#'
}) {
  return (
    <Link to={to} className="card-tarefa">
      <div className="card-information-tarefa">
        <p className="card-title-tarefa">{title}</p>
        <div className="divider" />
        <p className="card-textdate-tarefa">Data de criação</p>
        <p>
          <strong>{date}</strong>
        </p>
      </div>
    </Link>
  );
}
