import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";

export default function ModalCriarDaily({
  handleCloseModalDailyContent,
  createDailyContent,
  updateDailyContent,
  isUpdating,
  userDailyContent,
}) {
  const [didYesterday, setDidYesterday] = useState(
    userDailyContent?.did_yesterday || " "
  );
  const [doToday, setDoToday] = useState(userDailyContent?.do_today || " ");
  const [problems, setProblems] = useState(userDailyContent?.problems || " ");



  const handleSaveDailyContent = () => {
    if (isUpdating) {
      updateDailyContent({
        did_yesterday: didYesterday,
        do_today: doToday,
        problems,
      });
    } else {
      createDailyContent({
        did_yesterday: didYesterday,
        do_today: doToday,
        problems,
      });
    }

    handleCloseModalDailyContent();
  };

  return (
    <div className="modal-createDaily">
      <div className="modal-fade">
        <button onClick={handleCloseModalDailyContent}></button>
      </div>
      <div className="modalContainer-createDaily">
        <div className="containerCenter-createDaily">
          <button
            id="closeModal"
            type="button"
            onClick={handleCloseModalDailyContent}
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
              value= {didYesterday}
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
              value= {doToday}
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
              value= {problems}
              onChange={(e) => setProblems(e.target.value)}
            />
          </div>

          <div className="divBotao">
            <button className="btnCriarDaily" onClick={handleSaveDailyContent}>
              <FaCheck />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
