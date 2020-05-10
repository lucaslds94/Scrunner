import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

import "./styles.css";

export default function ModalConfirmDelTime({
  nameTime = "",
  handleCloseConfirmDelTime,
  handleConfirmDelTime,
}) {
  const [time, setTime] = useState("");
  const [erro, setErro] = useState(false);

  const handleValidation = () => {
    if (time === nameTime) {
      setErro(false);
      handleConfirmDelTime();
    } else {
      setErro(true);
    }
  };

  return (
    <div className="modal-confirmDelTime">
      <div className="modal-fade"></div>
      <div className="modalContainer-confirmDelTime">
        <div className="containerCenter-confirmDelTime">
          <div className="containerCenter-confirmDelTime-header">
            <h1>Você tem certeza ?</h1>
            <button onClick={handleCloseConfirmDelTime} className="confirmDelTime-closeModal">
              <FaTimes size={20} color={"#737FF3"} />
            </button>
          </div>
          <div className="divider" />
          <p className="text-red">Essa ação não poderá ser desfeita.</p>
          <p className="text-confirm">
            Escreva o nome do time <strong>{nameTime}</strong> para confirmar
          </p>
          <input
            className={erro ? "confirm-error" : ""}
            type="text"
            onChange={(e) => setTime(e.target.value)}
          />
          <button onClick={handleValidation} className="btnDeleteTime-confirm">
            Remover Time
          </button>
        </div>
      </div>
    </div>
  );
}
