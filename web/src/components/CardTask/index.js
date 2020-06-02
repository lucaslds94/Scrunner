import React from "react";
import "./styles.css";

import moment from "moment";
import "moment/locale/pt-br";

export default function CardTask({ title, date, dateRange, toPage }) {
  const getExpirationDate = () => {
    const ndate = moment(date);
    const expiration = moment(ndate).add(dateRange, "days");
    const now = moment(new Date());
    return expiration.diff(now, "days", false);
  };

  return (
    <div onClick={toPage} className="card-tarefa">
      <div className="card-information-tarefa">
        <p className="card-title-tarefa">{title}</p>
        <div className="divider" />

        <div className="task-dates">
          <div className="task-creation-date">
            <p className="card-textdate-tarefa">Data de criação</p>
            <p>
              <strong>{moment(date).format("DD/MM/YYYY")}</strong>
            </p>
          </div>

          <div className="task-expiration-date">
            <p className="card-textdate-tarefa">Expira em</p>
            {getExpirationDate() <= 0 ? (
              <p>Expirado</p>
            ) : (
              <p>
                <strong>{getExpirationDate()}</strong>
                <span> dias</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
