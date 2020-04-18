import React from "react";
import { FaTimes } from "react-icons/fa";
import "./styles.css";


export default function ModalCriarTime({ handleModalCreate }) {

  return (
    <div className="modal-createTime">
      <div className="modalFade-createTime"></div>
      <div className="modalContainer-createTime">
        <div className="containerCenter-createTime">
          <button id="closeModal" type="button" onClick={handleModalCreate}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <h1>Novo Time</h1>
          <hr />
          <form id="login" action="" method="POST">
            <div className="defaultField">
              <label htmlFor="nomeTime">Nome</label>
              <br />
              <input type="input" name="nomeTime" id="nomeTime" />
            </div>
            <div className="defaultField">
              <label htmlFor="categoria">Categoria</label>
              <br />
              <input type="input" name="categoria" id="categoria" />
            </div>
            <div className="defaultField">
              <label htmlFor="selectLider">Líder</label> 
              <br />
              <select className="select-lider" name="selectLider" id="selectLider">
                <option className="item-default" defaultValue hidden>
                  Selecione o nome
                </option>
                <option>
                  Líder 01
                </option>
                <option>
                  Líder 02
                </option>
              </select>
            </div>            
          </form>
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