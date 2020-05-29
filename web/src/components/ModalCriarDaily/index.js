import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import "./styles.css";

// import whiteCheck from "../../../src/assets/whiteCheck"

export default function ModalCriarDaily({ handleModalCreateDaily }) {
  return (
    <div className="modal-createDaily">
       <div className="modal-fade"><button onClick={handleModalCreateDaily} ></button></div> 
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
            <label htmlFor="nomeDaily">O que você fez ontem?</label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="nomeDaily"
              className="text-daily-content"
            />
          </div>
          <div className="defaultField">
            <label htmlFor="categoria">O que você irá fazer hoje?</label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="categoria"
              className="text-daily-content"
            />
          </div>
          <div className="defaultField">
            <label htmlFor="categoria">
              Existe/existiu algum impedimento no seu caminho?
            </label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="categoria"
              className="text-daily-content"
            />
          </div>

          <div className="divBotao">
            <button className="btnCriarDaily">
              <FaCheck />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
