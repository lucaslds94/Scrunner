import React, { useState } from "react";

import { toast } from "react-toastify";

import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

import "./styles.css";

import logo_roxo from "../../assets/logo_roxo_100.png";
import bannerEscolha from "../../assets/modalEscolha.png";

export default function ModalCadastrocolaborador({
  handleModalColaborador,
  registerColab,
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [colabName, setColabName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkTerms, setCheckTerms] = useState(false);

  function showPassword() {
    setShowPass(!showPass);
  }

  const showConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const handleRegisterColab = () => {
    if (colabName.trim().length === 0) {
      toast.error("Insira um nome válido");
      return;
    }

    if (!email.includes("@")) {
      toast.error("O email precisa ter o formato exemplo@email.com");
      return;
    }

    if (password.length < 8) {
      toast.error("A senha precisa de no mínimo 8 caracteres!");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("As senhas devem ser iguais");
      return;
    }

    if (!checkTerms) {
      toast.error("Você precisa concordar com os termos de uso!");
      return;
    }

    if (colabName && email && password && confirmPassword && checkTerms) {
      registerColab({ colabName, email, password });

      setColabName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="modal-area">
      <div className="modal-fade"></div>

      <div className="modal-main-container">
        <div className="main-left-container">
          <button
            className="responsive-close"
            onClick={handleModalColaborador}
            href="#"
          >
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <div className="title-container">
            <img src={logo_roxo} alt="Logo Scrunner" />
            <h1>Bem vindo ao Scrunner</h1>
          </div>
          <h2>Cadastre-se usando um email</h2>
          <form action="" method="POST">
            <div className="nomecolaborador">
              <label htmlFor="colabName">Nome do colaborador</label>
              <br />
              <input
                value={colabName}
                onChange={(e) => setColabName(e.target.value)}
                type="inputbox"
                name="colabName"
                id="nomecolaborador"
              />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <br />
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
              />
            </div>
            <div className="senha">
              <label htmlFor="password">Senha</label>
              <br />
              <input
                value={password}
                type={showPass ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="senha"
              />
              <button
                type="button"
                onClick={showPassword}
                tabIndex="-1"
                className="iconOlho"
              >
                {showPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>

            <div className="senha">
              <label htmlFor="confirmPassword">Confirmar senha</label>
              <br />
              <input
                value={confirmPassword}
                type={showConfirmPass ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                id="confirmPassword"
              />
              <button
                type="button"
                onClick={showConfirmPassword}
                tabIndex="-1"
                className="iconOlho"
              >
                {showConfirmPass && <FaEyeSlash size={20} color={"#737FF3"} />}
                {!showConfirmPass && <FaEye size={20} color={"#c3c3c3"} />}
              </button>
            </div>

            <div className="checkBox">
              <div>
                <input
                  value={checkTerms}
                  type="checkbox"
                  name="manterConec"
                  id="manterConec"
                  onChange={() => setCheckTerms(!checkTerms)}
                />
                <label htmlFor="manterConec">
                  Eu concordo com os{" "}
                  <a href="#abrirModalTermos">Termos e Condições</a>
                </label>
              </div>
            </div>
          </form>
          <button onClick={handleRegisterColab} id="btnContinue">
            Continuar
          </button>
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
