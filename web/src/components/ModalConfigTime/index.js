import React, { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

import ButtonAction from "../ButtonAction";

import ModalConfirmDelTime from "../ModalConfirmDelTime";

import "./styles.css";

export default function ModalConfigTime({
  handleModalConfig,
  nameTime,
  categoryTime,
  leaderMember,
  members = [],
}) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  return (
    <>
      {showModalConfirm && (
        <ModalConfirmDelTime
          handleCloseConfirmDelTime={() => setShowModalConfirm(false)}
          handleConfirmDelTime={() => alert("Deletando o time :(((")}
          nameTime={nameTime}
        />
      )}
      <div className="modal-configTime">
        <div className="modal-fade">
          <button onClick={handleModalConfig}></button>
        </div>
        <div className="modalContainer-configTime">
          <div className="containerCenter-configTime">
            <button id="closeModal" type="button" onClick={handleModalConfig}>
              <FaTimes size={20} color={"#737FF3"} />
            </button>
            <h1>Configurar Time</h1>
            <div className="divider" />

            <div className="config-text-field">
              <label htmlFor="nomeTime">Nome</label>
              <input
                type="input"
                name="nomeTime"
                id="nomeTime"
                defaultValue={nameTime}
              />
            </div>
            <div className="config-text-field">
              <label htmlFor="categoria">Categoria</label>
              <input
                type="input"
                name="categoria"
                id="categoria"
                defaultValue={categoryTime}
              />
            </div>
            <div className="config-text-field">
              <label htmlFor="selectLider">Líder</label>

              <select
                className="select-lider"
                name="selectLider"
                id="selectLider"
              >
                <option className="item-default" defaultValue hidden>
                  {leaderMember}
                </option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="buttonArea">
              <button
                onClick={() => setShowModalConfirm(!showModalConfirm)}
                className="btnDeleteTime"
              >
                Remover Time
              </button>
              <ButtonAction
                onClick={() => null}
                ButtonIcon={FaCheck}
                ButtonText="Salvar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
