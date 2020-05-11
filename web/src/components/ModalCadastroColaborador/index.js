import React, { useState } from "react";

import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

import "./styles.css";

import logo_roxo from "../../assets/logo_roxo_100.png";
import bannerEscolha from "../../assets/modalEscolha.png";

export default function ModalCadastrocolaborador({ handleModalColaborador }) {
  const [showPass, setShowPass] = useState(false);

  function showPassword() {
    setShowPass(!showPass);
  }

  return (
    <div className="modal-area">
      <div className="modal-fade"></div>

      <div className="modal-main-container">
        <div className="main-left-container">
          <button className="responsive-close" onClick={handleModalColaborador} href="#">
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <img src={logo_roxo} alt="Logo Scrunner" />
          <h1>Bem vindo ao Scrunner</h1>
          <h2>Cadastre-se usando um email</h2>
          <form action="" method="POST">
            <div className="nomecolaborador">
              <label htmlFor="nomeEmpesa">Nome do colaborador</label>
              <br />
              <input type="inputbox" name="nomecolaborador" id="nomecolaborador" />
            </div>
            <div className="email">
              <label htmlFor="Email">Email</label>
              <br />
              <input type="email" name="email" id="email" />
            </div>
            <div className="senha">
              <label htmlFor="password">Senha</label>
              <br />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                id="senha"
              />
              <button type="button" onClick={showPassword} id="iconOlho">
                {showPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>
            <div className="checkBox">
              <div>
                <input
                  value="1"
                  type="checkbox"
                  name="manterConec"
                  id="manterConec"
                />
                <label htmlFor="manterConec">
                  Eu concordo com os{" "}
                  <a href="#abrirModalTermos">Termos e Condições</a>
                </label>
              </div>
            </div>
          </form>
          <button id="btnContinue">Continuar</button>
        </div>

        <div className="main-right-container">
          <button onClick={handleModalColaborador} href="#">
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <img src={bannerEscolha} alt="Banner Modal Cadastro colaborador" />
        </div>
      </div>
    </div>
  );
}
