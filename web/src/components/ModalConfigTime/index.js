import React, { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

import ButtonAction from "../ButtonAction";

import ModalConfirmDelTime from "../ModalConfirmDelTime";

import "./styles.css";

export default function ModalConfigTime({
  handleModalConfig,
  nameTime,
  categoryTime,
  leaderMember = "Nenhum líder selecionado.",
  leaderId = "0",
  members = [],
  updateTeam,
  deleteTeam
}) {
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [newName, setNewName] = useState(nameTime);
  const [newCategory, setNewCategory] = useState(categoryTime);
  const [newLeader, setNewLeader] = useState(leaderId);

  const handleSaveButton = () => {
    if (
      newName.trim() !== nameTime ||
      newCategory.trim() !== categoryTime ||
      newLeader !== leaderId
    ) {
      
      const newData = {
        name: newName.trim(),
        category: newCategory.trim(),
        leader_id: newLeader,
      };

      updateTeam(newData);
    }
  };

  const handleDeleteButton = () => {
    setShowModalConfirm(false);
    deleteTeam();
  }


  return (
    <>
      {showModalConfirm && (
        <ModalConfirmDelTime
          handleCloseConfirmDelTime={() => setShowModalConfirm(false)}
          handleConfirmDelTime={handleDeleteButton}
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
            <h1> Configurar Time </h1>
            <div className="divider" />

            <div className="config-text-field">
              <label htmlFor="nomeTime">Nome</label>
              <input
                type="input"
                name="nomeTime"
                id="nomeTime"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="config-text-field">
              <label htmlFor="categoria">Categoria</label>
              <input
                type="input"
                name="categoria"
                id="categoria"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <div className="config-text-field">
              <label htmlFor="selectLider">Líder</label>

              <select
                className="select-lider"
                name="selectLider"
                id="selectLider"
                value={newLeader}
                onChange={(e) => setNewLeader(e.target.value)}
              >
                <option className="item-default" defaultValue hidden>
                  {leaderMember !== '' ? leaderMember : 'Não há líder no time'}
                </option>
                {members.map(
                  (member) =>
                    !member.is_owner && (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    )
                )}
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
                onClick={handleSaveButton}
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
