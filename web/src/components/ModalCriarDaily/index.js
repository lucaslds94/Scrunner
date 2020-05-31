import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";

export default function ModalCriarDaily({
  handleModalCreateDaily,
  createDailyContent,
}) {
  const [didYesterday, setDidYesterday] = useState("");
  const [doToday, setDoToday] = useState("");
  const [problems, setProblems] = useState("");

  const handleCreateDailyContent = () => {
    createDailyContent({
      did_yesterday: didYesterday,
      do_today: doToday,
      problems,
    });
    handleModalCreateDaily();
  };

  return (
    <div className="modal-createDaily">
      <div className="modal-fade">
        <button onClick={handleModalCreateDaily}></button>
      </div>
      <div className="modalContainer-createDaily">
        <div className="containerCenter-createDaily">
          <button
            id="closeModal"
            type="button"
            onClick={handleModalCreateDaily}
          >
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <h1>Adicionar registro</h1>
          <div className="divider" />

          <div className="defaultField">
            <label htmlFor="did_yesterday">O que você fez ontem?</label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="did_yesterday"
              className="text-daily-content"
              onChange={(e) => setDidYesterday(e.target.value)}
            />
          </div>
          <div className="defaultField">
            <label htmlFor="do_today">O que você irá fazer hoje?</label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="do_today"
              className="text-daily-content"
              onChange={(e) => setDoToday(e.target.value)}
            />
          </div>
          <div className="defaultField">
            <label htmlFor="problems">
              Existe/existiu algum impedimento no seu caminho?
            </label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="problems"
              className="text-daily-content"
              onChange={(e) => setProblems(e.target.value)}
            />
          </div>

          <div className="divBotao">
            <button
              className="btnCriarDaily"
              onClick={handleCreateDailyContent}
            >
              <FaCheck />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
