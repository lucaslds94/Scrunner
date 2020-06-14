import React, { useState, useCallback } from "react";
import "./styles.css";

import { BsTrash } from "react-icons/bs";

import moment from "moment";
import "moment/locale/pt-br";

import ModalConfirmAction from "../ModalConfirmAction";

export default function CardTask({
  title,
  date,
  dateRange,
  toPage,
  isLeader = false,
  deleteTaskBoard,
}) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const handleConfirmRemove = () => {
    setShowModalConfirm(true);
  };

  const handleRemove = () => {
    setShowModalConfirm(false);
    deleteTaskBoard();
  };

  const getExpiresIn = useCallback(() => {
    const ndate = moment(date);
    const expiration = moment(ndate).add(dateRange, "days");
    const now = moment(new Date());
    const expirationDays = Math.round(expiration.diff(now, "days", true));

    if (expirationDays <= 0) {
      return "Expirado";
    }

    if (expirationDays === 1) {
      return `${expirationDays} dia`;
    } else {
      return `${expirationDays} dias`;
    }
  }, [date, dateRange]);

  const getExpirationDate = () => {
    const ndate = moment(date).format();
    return moment(ndate)
      .add(dateRange - 1, "days")
      .format("DD/MM/YYYY");
  };

  return (
    <>
      {showModalConfirm && (
        <ModalConfirmAction
          handleConfirmAction={handleRemove}
          handleCloseModalConfirmAction={() => setShowModalConfirm(false)}
        />
      )}
      <div className="component-card-task-container">
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

              <div className="task-creation-date">
                <p className="card-textdate-tarefa">Data de expiração</p>
                <p>
                  <strong>{getExpirationDate()}</strong>
                </p>
              </div>
            </div>
            <div className="task-expiration-date">
              <p className="card-textdate-tarefa">Expira em</p>
              <p>
                <strong>{getExpiresIn()}</strong>
              </p>
            </div>
          </div>
        </div>
        {isLeader && (
          <div onClick={handleConfirmRemove} className="card-task-trash-button">
            <BsTrash size={25} color={"#BBB"} />
          </div>
        )}
      </div>
    </>
  );
}
