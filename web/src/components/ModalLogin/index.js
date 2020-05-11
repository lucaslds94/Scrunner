import React, { useState } from "react";

import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

import "./styles.css";

import logo_roxo from "../../assets/logo_roxo_100.png";
import bannerLogin from "../../assets/modalLogin.png";

export default function ModalLogin({ handleModalLogin }) {
  const [showPass, setShowPass] = useState(false);

  function showPassword() {
    setShowPass(!showPass);
  }

  return (
    <div className="modal">
      <div className="modal-fade"><button onClick={handleModalLogin}></button></div>

      <div className="modalContainer">
        <div className="containerLeft">
          <img src={bannerLogin} alt="Banner Modal Login" />
        </div>

        <div className="containerRight">
          <button id="closeModal" type="button" onClick={handleModalLogin}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <img src={logo_roxo} alt="Logo Scrunner" />
          <h1>Bem vindo novamente</h1>
          <h2>Entre usando um email</h2>
          <form id="login" action="" method="POST">
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
              <button type="button" onClick={showPassword} id="fotoOlho">
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
                <label htmlFor="manterConec">Manter conectado</label>
              </div>
              <button type="button" id="esqSenha">
                Esqueceu a senha?
              </button>
            </div>
          </form>
          <button type="submit" id="btnContinue">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
