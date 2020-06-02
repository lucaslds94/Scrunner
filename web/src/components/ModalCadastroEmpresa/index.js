import React, { useState } from "react";

import { toast } from "react-toastify";

import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";

import "./styles.css";

import logo_roxo from "../../assets/logo_roxo_100.png";
import bannerEscolha from "../../assets/modalEscolha.png";

export default function ModalCadastroEmpresa({
  handleModalEmpresa,
  registerCompany,
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkTerms, setCheckTerms] = useState(false);

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const showConfirmPassword = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const handleRegisterCompany = () => {
    if (companyName.trim().length === 0) {
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

    if (companyName && email && password && confirmPassword && checkTerms) {
      registerCompany({ companyName, email, password });

      setCompanyName("");
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
            onClick={handleModalEmpresa}
            href="#"
          >
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <div className="title-container">
            <img src={logo_roxo} alt="Logo Scrunner" />
            <h1>Bem vindo ao Scrunner</h1>
          </div>
          <h2>Cadastre-se usando um email</h2>

          <div className="nomeEmpresa">
            <label htmlFor="companyName">Nome da Empresa</label>

            <input
              value={companyName}
              type="text"
              name="companyName"
              id="companyName"
              tabIndex="1"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>

            <input
              value={email}
              type="email"
              name="email"
              id="email"
              tabIndex="2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="senha">
            <label htmlFor="password">Senha</label>

            <input
              type={showPass ? "text" : "password"}
              value={password}
              name="password"
              id="password"
              tabIndex="3"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={showPassword} tabIndex="-1" id="iconOlho">
              {showPass && <FaEyeSlash size={20} color={"#737FF3"} />}
              {!showPass && <FaEye size={20} color={"#c3c3c3"} />}
            </button>
          </div>

          <div className="senha">
            <label htmlFor="confirmPassword">Confirmar Senha</label>

            <input
              type={showConfirmPass ? "text" : "password"}
              value={confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              tabIndex="4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={showConfirmPassword} tabIndex="-1" id="iconOlho">
              {showConfirmPass && <FaEyeSlash size={20} color={"#737FF3"} />}
              {!showConfirmPass && <FaEye size={20} color={"#c3c3c3"} />}
            </button>
          </div>

          <div className="checkBox">
            <div>
              <input
                value={checkTerms}
                type="checkbox"
                name="check-terms"
                id="check-terms"
                tabIndex="5"
                onChange={() => setCheckTerms(!checkTerms)}
              />
              <label htmlFor="check-terms">
                Eu concordo com os{" "}
                <a href="#abrirModalTermos">Termos e Condições</a>
              </label>
            </div>
          </div>

          <button id="btnContinue" tabIndex="6" onClick={handleRegisterCompany}>
            Continuar
          </button>
        </div>

        <div className="main-right-container">
          <button onClick={handleModalEmpresa} href="#">
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <img src={bannerEscolha} alt="Banner Modal Cadastro Empresa" />
        </div>
      </div>
    </div>
  );
}
