import React, { useState } from "react";

import "./styles.css";
import { FaTimes } from "react-icons/fa";

import logo_roxo from "../../assets/logo_roxo_100.png";
import bannerEscolha from "../../assets/modalEscolha.png";

import empresa_icon from "../../assets/empresa_icon.png";
import colaborador_icon from "../../assets/colaborador_icon.png";

export default function ModalEscolhaCadastro({
  handleModalEscolha,
  handleSubmited,
}) 

{
  const [empresa, setEmpresa] = useState(false);
  const [colaborador, setColaborador] = useState(false);

  const selectOption = (op) => {
    if (op === "empresa") {
      setEmpresa(true);
      setColaborador(false);
    } else {
      setColaborador(true);
      setEmpresa(false);
    }
  };

  const handleSubmit = () => {
    if (empresa) {
      handleSubmited("empresa");
    } else if(colaborador) {
      handleSubmited("colaborador");
    } 
  };

  return (
    <div className="modal-escolha">
      <div className="modal-fade"></div>

      <div className="modalContainer-escolha">
        <div className="containerLeft-escolha">
          <img src={logo_roxo} alt="Logo Scrunner" />
          <h1>Bem vindo ao Scrunner</h1>
          <h5>Escolha o seu perfil</h5>

          <div className="containerOptions">
            <div
              className={`empresa ${empresa && "selected"}`}
              onClick={() => selectOption(`empresa`)}
            >
              <img src={empresa_icon} alt="Empresa icon" />
              <div className="description">
                <h3>Sou uma empresa</h3>
                <p>
                  Vou usar o Scrunner para organizar meus projetos e/ou times.
                </p>
              </div>
            </div>

            <div
              className={`colaborador ${colaborador && "selected"}`}
              onClick={() => selectOption(`colaborador`)}
            >
              <img src={colaborador_icon} alt="Colaborador icon" />
              <div className="description">
                <h3>Sou um colaborador</h3>
                <p>
                  A empresa onde trabalho usa Scrunner e eu possuo um código de
                  acesso.
                </p>
              </div>
            </div>
          </div>

          <button onClick={handleSubmit} id="btnContinue">
            Continuar
          </button>
        </div>

        <div className="containerRight-escolha">
          <img src={bannerEscolha} alt="Banner modal" />
          <button type="button" onClick={handleModalEscolha}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
        </div>
      </div>
    </div>
  );
}
