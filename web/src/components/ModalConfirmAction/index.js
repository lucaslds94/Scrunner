import React from "react";

import { FaTimes } from "react-icons/fa";
import './styles.css';

export default function ModalConfirmAction({
  handleCloseModalConfirmAction,
  handleConfirmAction,
}) {
  return (
    <div className="container-confirm-action">
      <div className="modal-fade">
        <button onClick={handleCloseModalConfirmAction} /> 
      </div>

      <div className="confirm-action-content">
        <div className="confirm-action-header">
          <h2> Você tem certeza? </h2>
          <button
            onClick={handleCloseModalConfirmAction}
            className="confirm-action-close-modal"
          >
            <FaTimes size={20} color={"#737FF3"} />
          </button>
        </div>

        <div className="divider" />

        <p> Esta ação não poderá ser desfeita. </p>
        <div className="confirm-action-buttons">
          <button onClick={handleConfirmAction}>Sim</button>
          <button onClick={handleCloseModalConfirmAction}>Não</button>
        </div>
      </div>
    </div>    
  );
}
