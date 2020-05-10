import React from "react";
import { FaTimes } from "react-icons/fa";
import "./styles.css";

export default function ModalCriarTime({ handleModalCreate }) {
  return (
    <div className="modal-createTime">
      <div className="modal-fade"></div>
      <div className="modal-criar-time">
        <div className="containerCenter-createTime">
          <button id="closeModal" type="button" onClick={handleModalCreate}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <h1>Novo Time</h1>
          <div className="divider" />

          <div className="text-field">
            <label htmlFor="nomeTime">Nome</label>
            <input type="input" name="nomeTime" id="nomeTime" />
          </div>
          <div className="text-field">
            <label htmlFor="categoria">Categoria</label>
            <input type="input" name="categoria" id="categoria" />
          </div>

          <div className="divBotao">
            <button className="btnCriarTime" type="submit">
              Criar Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
