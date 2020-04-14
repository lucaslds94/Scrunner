import React from "react";

import "./styles.css";
import { FaTimes } from "react-icons/fa";

import logo_roxo from "../../assets/logo_roxo_100.png";
import hashtag from "../../assets/hashtag.png";

export default function ModalEscolhaCadastro({
  handleModalCodigo,
  handleModalCodigoContinue,
})

{
  return (
    <div className="modal-codigo">
      <div className="modalFade-codigo"></div>

      <div className="modalContainer-codigo">
        <div className="containerLeft-codigo">
          <img src={logo_roxo} alt="Logo Scrunner" />
          <h1>Bem vindo ao Scrunner</h1>
          <h5>Use o código fornecido pela empresa</h5>

          <div className="ContainerCode">
            <p className="first-p">Código da empresa</p>
            <div className="codigo">
              <input type="text" id="codigoEmpresa" placeholder="Dígite o código"></input>
            </div>
            <p className="last-p">Entre em contato com sua empresa e solicite o código de acesso</p>
          <button onClick={handleModalCodigoContinue} id="btnContinue">
            Continuar
          </button>
        </div>
        </div>
        <div className="containerRight-codigo">
          <img src={hashtag} alt="Hashtag" />
          <button type="button" onClick={handleModalCodigo}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
        </div>
      </div>
    </div>
  );
}
