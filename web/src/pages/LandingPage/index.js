import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { isAuth } from "../../utils/auth";

import "./styles.css";

import { useHistory } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, animateScroll as scroll } from "react-scroll";

import BurgerMenu from "../../components/BurgerMenu";

import ModalLogin from "../../components/ModalLogin";
import ModalEscolhaCadastro from "../../components/ModalEscolhaCadastro";
import ModalCadastroEmpresa from "../../components/ModalCadastroEmpresa";
import ModalCadastroColaborador from "../../components/ModalCadastroColaborador";

import LogoV2 from "../../assets/Logo_v2.png";
import logo2 from "../../assets/logo2.png";
import teamSpirit from "../../assets/team_spirit.png";
import trabalho from "../../assets/trabalho.png";

import tarefas from "../../assets/tarefas.png";
import daily from "../../assets/daily.png";
import relatorios from "../../assets/relatorios.png";
import gestao from "../../assets/gestao.png";
import quadroScrum from "../../assets/quadro_scrum.png";
import section4banner from "../../assets/section4banner.jpg";
import contatos from "../../assets/contatos.png";

import facebook_icon from "../../assets/facebook.png";
import instagram_icon from "../../assets/instagram.png";
import linkedin_icon from "../../assets/linkedin.png";

import { setLocalStorage } from "../../utils/localStorage";

export default function LandingPage() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalEscolha, setShowModalEscolha] = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);
  const [showModalColaborador, setShowModalColaborador] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isAuth()) {
      history.push("/dashboard");
    }

    if (history.location.state && history.location.state.error === 1) {
      toast.error("A sessão expirou, realize o login novamente");
    }
  }, [history]);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleModalLogin = () => {
    setShowModalLogin(!showModalLogin);
  };

  const handleModalEscolha = () => {
    setShowModalEscolha(!showModalEscolha);
  };

  const handleModalEscolhaSubmit = (op) => {
    setShowModalEscolha(false);

    if (op === "empresa") {
      setShowModalEmpresa(true);
    } else {
      setShowModalColaborador(true);
    }
  };

  const registerCompany = async (companyData) => {
    setShowModalEmpresa(false);

    const companyModel = {
      name: companyData.companyName.trim(),
      email: companyData.email.toLowerCase().trim(),
      password: companyData.password.trim(),
      is_owner: true,
    };

    try {
      await api.post("/user", companyModel);

      login(companyModel, true);
    } catch (error) {
      if (error.response.data.err) {
        return toast.error("Email já cadastrado como empresa!");
      }

      toast.error("Ocorreu um erro inesperado.");
    }
  };

  const registerColab = async (colabData) => {
    setShowModalColaborador(false);

    const colabModel = {
      name: colabData.colabName.trim(),
      email: colabData.email.toLowerCase().trim(),
      password: colabData.password.trim(),
      is_owner: false,
    };

    try {
      await api.post("/user", colabModel);

      login(colabModel, true);
    } catch (error) {
      if (error.response.data.err) {
        return toast.error("Email já cadastrado como colaborador!");
      }

      toast.error("Ocorreu um erro inesperado.");
    }
  };

  const login = async (dataLogin, afterRegister = false) => {
    try {
      const modelUserLogin = {
        email: dataLogin.email.toLowerCase().trim(),
        password: dataLogin.password.trim(),
      };

      const response = await api.post("/login", modelUserLogin);

      setShowModalLogin(false);

      setLocalStorage("@Scrunner:user", response.data.user);
      setLocalStorage("@Scrunner:token", response.data.token);

      if (afterRegister) {
        return history.push("/dashboard", { afterRegister: true });
      }

      history.push("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        return toast.error("Sua conta está desativada.");
      }

      if (error.response && error.response.data.err) {
        return toast.error(
          "Erro ao realizar o login do usuário. Tente novamente"
        );
      }

      toast.error("Ocorreu um erro inesperado.");
    }
  };

  return (
    <>
      {showModalLogin && (
        <ModalLogin login={login} handleModalLogin={handleModalLogin} />
      )}
      {showModalEscolha && (
        <ModalEscolhaCadastro
          handleModalEscolha={handleModalEscolha}
          handleSubmited={handleModalEscolhaSubmit}
        />
      )}
      {showModalEmpresa && (
        <ModalCadastroEmpresa
          handleModalEmpresa={() => setShowModalEmpresa(false)}
          registerCompany={registerCompany}
        />
      )}

      {showModalColaborador && (
        <ModalCadastroColaborador
          handleModalColaborador={() => setShowModalColaborador(false)}
          registerColab={registerColab}
        />
      )}

      <header>
        <nav>
          <BurgerMenu
            handleModalEscolha={handleModalEscolha}
            handleModalLogin={handleModalLogin}
          />
          <div>
            <button className="linkLogo" onClick={scrollToTop}>
              <img className="logoNav" src={LogoV2} alt="Logo Scrunner" />
            </button>

            <ul>
              <li>
                <Link
                  activeClass="active"
                  to="porqueScrunner"
                  spy={false}
                  smooth={true}
                  offset={-70}
                  duration={300}
                >
                  Por que usar Scrunner?
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="aplicacoes"
                  spy={false}
                  smooth={true}
                  offset={-70}
                  duration={300}
                >
                  Aplicações
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="metodologias"
                  spy={false}
                  smooth={true}
                  offset={-20}
                  duration={300}
                >
                  Metodologias Ágeis
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="contato"
                  spy={false}
                  smooth={true}
                  offset={-120}
                  duration={300}
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <ul className="loginOpt">
            <li>
              <button
                type="button"
                className="logon"
                onClick={handleModalEscolha}
              >
                Cadastrar-se
              </button>
            </li>
            <li>
              <button
                type="button"
                className="login"
                onClick={handleModalLogin}
              >
                Fazer Login
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="scrunnerSec1">
          <div className="infoScrum">
            <br />
            <h1>Organize projetos com Scrunner.</h1>
            <p>
              Finalize projetos, atinja metas e
              <br />
              organize times com mais <strong>agilidade</strong> e autonomia.
            </p>
            <br />
            <button onClick={handleModalEscolha}>Começar a usar</button>
          </div>
          <img
            id="teamSpirit"
            src={teamSpirit}
            alt="Imagem Trabalho em Equipe"
          />
        </section>
        <section id="porqueScrunner" className="scrunner">
          <div>
            <img id="bannerTrabalho" src={trabalho} alt="Imagem Trabalho" />
            <div className="informacaoScrunner">
              <h1>Por que</h1>
              <h1>usar Scrunner?</h1>
              <p>
                Observando a tendência do uso de metodologias ágeis na gestão de
                times e projetos, o Scrunner visa incentivar e facilitar a
                aplicação do <strong>Scrum</strong>, uma das mais importantes e
                utilizadas metodologias de gerenciamento de projetos do mercado,
                de forma prática e intuitiva reunindo conceitos e ferramentas em
                um só lugar.
              </p>
              <p>
                Gerencie projetos e equipes de forma mais ágil com Scrunner.
              </p>
            </div>
          </div>
          <div id="aplicacoes" className="containerIcons">
            <div>
              <img className="icon" src={tarefas} alt="Icone Tarefas" />
              <h1 className="tituloIcone">Tarefas</h1>
              <p>
                Crie tarefas e direcione-as para os membros presentes no time.
              </p>
            </div>
            <div>
              <img className="icon" src={daily} alt="Icone Daily" />
              <h1 className="tituloIcone">Dailys</h1>
              <p>
                Anote as informações discutidas nas reuniões diárias do Scrum.
              </p>
            </div>
            <div>
              <img className="icon" src={relatorios} alt="Icone Relatórios" />
              <h1 className="tituloIcone">Relatórios</h1>
              <p>
                Tenha visão do seu projeto evoluindo com gráficos de desempenho.
              </p>
            </div>
            <div>
              <img className="icon" src={gestao} alt="Icone Gestão" />
              <h1 className="tituloIcone">Gestão</h1>
              <p>
                Com Scrunner, gerencie as informações dos projetos e dos times.
              </p>
            </div>
          </div>
        </section>
        <section id="metodologias" className="metodologias">
          <div>
            <div className="informacaoMetodologias">
              <h1>Metodologias</h1>
              <h1>ágeis</h1>
              <p>
                Metodologias ágeis são conceitos muito abordados hoje em dia nas
                grandes empresas, inspirando gestores no processo de
                desenvolvimento de projetos e de gerenciamento de equipes. Esses
                métodos possuem como finalidade gerar resultados agilizando todo
                o processo de desenvolvimento, e, juntamente com a formação de
                equipes, melhorar a comunicação e relacionamento entre os
                profissionais.
              </p>
            </div>
            <img id="quadroScrum" src={quadroScrum} alt="Quadro Scrum" />
          </div>

          <div className="containerArtigos">
            <h3>Artigos sobre:</h3>
            <div className="artigos">
              <a
                target="__blank"
                href="https://www.desenvolvimentoagil.com.br/scrum/"
              >
                <div className="artigo">
                  <div className="artigo-border"></div>
                  <h3>O que é Scrum?</h3>
                  <p>
                    No Scrum, os projetos são divididos em ciclos (tipicamente
                    mensais) chamados de Sprints...
                  </p>
                  <div>
                    <p>
                      {" "}
                      Leia mais
                      <FaAngleRight size={20} color={"#328CC1"} />
                    </p>
                  </div>
                </div>
              </a>

              <a
                target="__blank"
                href="https://www.desenvolvimentoagil.com.br/scrum/daily_scrum"
              >
                <div className="artigo">
                  <div className="artigo-border"></div>
                  <h3>Daily Scrum</h3>
                  <p>
                    A cada dia do Sprint, a equipe faz uma reunião diária
                    chamada de Daily Scrum...
                  </p>
                  <div>
                    <p>
                      Leia mais
                      <FaAngleRight size={20} color={"#328CC1"} />
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="sessao4">
          <div className="divSessao4">
            <img
              className="imgSessao4"
              src={section4banner}
              alt="BannerSessao4"
            />
            <div className="agilSessao4">Seja ágil!</div>
            <div className="textoSessao4">
              Desenvolva projetos e gerencie times de forma ágil com Scrunner!
            </div>
            <div className="divBotaoSessao4">
              <button onClick={handleModalEscolha} className="botaoSessao4">
                Começar a usar
              </button>
            </div>
          </div>
        </section>
        <section className="contatos">
          <div className="infoContatos">
            <h3>Fale conosco</h3>
            <img
              className="bannerContatos"
              src={contatos}
              alt="Banner de contatos"
            />
            <p>
              Possui alguma dúvida sobre como o sistema funciona, ou até mesmo
              sobre metodologias ágeis? Sinta-se à vontade para falar sobre com
              a gente.
              <br />
              <br />
              Mande-nos um email através do formulário ou diretamente para:
              <br />
              <br />
              <a id="linkEmail" href="mailto: scrunner@contato.com.br">
                scrunner@contato.com.br
              </a>
            </p>

            <p id="textoClaro">Nossas redes sociais:</p>
            <div className="redesSociais">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://facebook.com"
              >
                <img src={facebook_icon} alt="Logo Facebook" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://linkedin.com"
              >
                <img src={linkedin_icon} alt="Logo linkedin" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://instagram.com"
              >
                <img src={instagram_icon} alt="Logo instagram" />
              </a>
            </div>
          </div>
          <form id="contato" action="" method="POST">
            <div className="borderForm"></div>

            <br />
            <p className="textoNegrito">Nos envie uma mensagem</p>
            <br />
            <div className="dadosUsuario">
              <label className="label-form" htmlFor="nome">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Jhon Doe"
                required
              />
              <br />
              <label className="label-form" htmlFor="email-adress">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email-adress"
                placeholder="jhondoe@mail.com"
                required
              />
              <br />
              <label className="label-form" htmlFor="tel">
                Telefone
              </label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="99-99999999"
                required
              />
              <br />
            </div>
            <div>
              <p className="textoCinza">Preferência de comunicação por:</p>
              <br />
              <ul className="preferences-choice">
                <li className="preference">
                  <input type="radio" name="prefTel" id="prefTel" />
                  <label className="textoCinza" htmlFor="prefTel">
                    Telefone
                  </label>
                </li>

                <li className="preference">
                  <input type="radio" name="prefEmail" id="prefEmail" />
                  <label className="textoCinza" htmlFor="prefEmail">
                    Email
                  </label>
                </li>
              </ul>

              <br />
              <br />
            </div>
            <div className="textoForm">
              <label className="textoCinza" htmlFor="formMsg">
                Como podemos ajudar?
              </label>
              <br />
              <textarea
                name="formMsg"
                id="formMsg"
                cols="30"
                rows="3"
              ></textarea>
            </div>
            <br />
            <div className="containerBtn">
              <input type="submit" value="Enviar" />
            </div>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-largura">
          <div>
            <button className="linkLogo" onClick={scrollToTop}>
              <img className="logoNav" src={logo2} alt="Logo Scrunner" />
            </button>
            <ul>
              <li>
                <Link
                  activeClass="active"
                  to="porqueScrunner"
                  spy={false}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  Por que usar Scrunner?
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="aplicacoes"
                  spy={false}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  Aplicações
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="metodologias"
                  spy={false}
                  smooth={true}
                  offset={-20}
                  duration={350}
                >
                  Metodologias ágeis
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="contato"
                  spy={false}
                  smooth={true}
                  offset={-120}
                  duration={350}
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <p>Todos os direitos reservados 2020 &copy; | Scrunner</p>
        </div>
      </footer>
      <ToastContainer limit={3} />
    </>
  );
}
