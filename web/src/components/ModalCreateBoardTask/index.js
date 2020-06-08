import React, { useState } from "react";

import "./styles.css";
import { toast } from "react-toastify";
import { FaTimes, FaCheck } from "react-icons/fa";

import ButtonAction from "../ButtonAction";

export default function ModalCreateBoardTask({ handleCloseModal, createBoard }) {
  const [name, setName] = useState("");
  const [days, setDays] = useState("0");

  const handleSubmit = () => {
    if (name.trim() === "") {
      return toast.error("Por favor insira um nome válido.");
    }

    if (days === "0") {
      return toast.error("Selecione a duração desta sprint.");
    }

    const data = {
      name: name.trim(),
      days,
    };

    createBoard(data);
  };

  return (
    <>
      <div className="create-task-component">
        <div className="modal-fade"></div>

        <div className="create-task-container">
          <div className="create-task-content">
            <div className="create-task-title">
              <h3>Criar novo quadro</h3>
              <button type="button" onClick={handleCloseModal}>
                <FaTimes size={20} color={"#737FF3"} />
              </button>
            </div>
            <div className="create-task-inputs">
              <input
                type="text"
                placeholder="Nome do quadro"
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className="select-days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              >
                <option value="0" defaultValue>
                  Selecione a duração
                </option>
                <option value="5">5 dias</option>
                <option value="10">10 dias</option>
                <option value="15">15 dias</option>
              </select>
            </div>
            <div className="create-task-button">
              <ButtonAction
                onClick={handleSubmit}
                ButtonText="Criar"
                ButtonIcon={FaCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
