import React from "react";
import { FaTimes } from "react-icons/fa";
import "./styles.css";

// import whiteCheck from "../../../src/assets/whiteCheck"


export default function ModalCriarDaily({ handleModalCreateDaily }) {

  return (
    <div className="modal-createDaily">
      <div className="modalFade-createDaily"></div>
      <div className="modalContainer-createDaily">
        <div className="containerCenter-createDaily">
          <button id="closeModal" type="button" onClick={handleModalCreateDaily}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <h1>Adicionar registro</h1>
          <hr />
          <form id="fezOntem" action="" method="POST">
            <div className="defaultField">
              <label htmlFor="nomeDaily">O que você fez ontem?</label>
              <br />
              <input type="input" name="nomeDaily" id="nomeDaily" />
            </div>
            <div className="defaultField">
              <label htmlFor="categoria">O que você irá fazer hoje?</label>
              <br />
              <input type="input" name="categoria" id="fezHoje" />
            </div>
            <div className="defaultField">
              <label htmlFor="categoria">Existe/existiu algum impedimento no seu caminho?</label>
              <br />
              <input type="input" name="categoria" id="motivo" />
            </div>            
          </form>
          <div className="divBotao">
            <button className="btnCriarDaily"><strong>✓</strong>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
