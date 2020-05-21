import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { toast } from "react-toastify";

import "./styles.css";

export default function ModalCriarTime({ handleModalCreate, registerTeam }) {
  const [teamName, setTeamName] = useState("");
  const [category, setCategory] = useState("");

  const handleRegisterTeam = () => {
    if (teamName.trim().length === 0) {
      toast.error("Insira um nome válido!");
      return;
    }

    if (category.trim().length === 0) {
      toast.error("Insira uma categoria válida!");
      return;
    }

    if (teamName && category) {
      registerTeam({teamName, category});

      setTeamName("");
      setCategory("");
    }
  };

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
            <input
              type="input"
              name="nomeTime"
              id="nomeTime"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="text-field">
            <label htmlFor="categoria">Categoria</label>
            <input
              type="input"
              name="categoria"
              id="categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="divBotao">
            <button
              className="btnCriarTime"
              type="submit"
              onClick={handleRegisterTeam}
            >
              Criar Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
