import React, { useState } from "react";
import api from '../../services/api';
import "./styles.css";

import { FaAngleRight } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, animateScroll as scroll } from 'react-scroll';

import ModalLogin from "../../components/ModalLogin";
import ModalEscolhaCadastro from "../../components/ModalEscolhaCadastro";
import ModalCadastroEmpresa from "../../components/ModalCadastroEmpresa";
import ModalCodigoColaborador from "../../components/ModalCodigoColaborador";
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

export default function LandingPage() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalEscolha, setShowModalEscolha] = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);
  const [showModalColaborador, setShowModalColaborador] = useState(false);
  const [showModalCodigo, setShowModalCodigo] = useState(false);


  const scrollToTop = () => {
    scroll.scrollToTop();
  }

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
      setShowModalCodigo(true);
    }
  };

  const handleModalCodigoContinue = () => {
    setShowModalCodigo(false);
    setShowModalColaborador(true);
  };

  const registerCompany = async (companyData) => {
    setShowModalEmpresa(false);

    const companyModel = {
      name: companyData.companyName,
      email: companyData.email,
      password: companyData.password,
      is_owner: 'T'
    }

    try{
      await api.post('/user', companyModel);
      
      toast.success("Cadastro realizado com sucesso!");
    }catch(error){

      if(error.response.data.err){
        return toast.error('Email já cadastrado');
      }
      
      toast.error('Ocorreu um error inesperado');
    } 
  }

  return (
    <>
      {showModalLogin && <ModalLogin handleModalLogin={handleModalLogin} />}
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
      {showModalCodigo && (
        <ModalCodigoColaborador
          handleModalCodigo={() => setShowModalCodigo(false)}
          handleModalCodigoContinue={handleModalCodigoContinue}
        />
      )}

      {showModalColaborador && (
        <ModalCadastroColaborador
          handleModalColaborador={() => setShowModalColaborador(false)}
        />
      )}
      
      <header>
        <nav>
          <aside id="burger">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </aside>
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
                  duration={300}>
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
                  duration={300}>
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
                  duration={300}>
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
                  duration={300}>
                Contatos
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
            <button onClick={handleModalEscolha} >Começar a usar</button>
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
                de forma prática e intuitiva reunindo conceitos e ferramentas
                em um só lugar.
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
              <p>Crie tarefas e distribua para os membros que estão no time.</p>
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
              <p>Tenha visão do seu projeto evoluindo com o método Scrum.</p>
            </div>
            <div>
              <img className="icon" src={gestao} alt="Icone Gestão" />
              <h1 className="tituloIcone">Gestão</h1>
              <p>
                Com Scrunner gerencie as informações dos projetos e dos times.
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
                o processo de desenvolvimento e juntamente com a formação de
                equipes, melhorar a comunicação e relacionamento entre os
                profissionais.
              </p>
            </div>
            <img id="quadroScrum" src={quadroScrum} alt="Quadro Scrum" />
          </div>
          
          <div className="containerArtigos">
            <h3>Artigos sobre:</h3>
            <div className="artigos">

              <a target="__blank" href="https://www.desenvolvimentoagil.com.br/scrum/">
                <div className="artigo">
                  <div className="artigo-border"></div>
                  <h3>O que é Scrum?</h3>
                  <p>
                    No Scrum, os projetos são divididos em ciclos (tipicamente
                    mensais) chamados de Sprints...
                  </p>
                  <div>
                      <p> Leia mais
                      <FaAngleRight size={20} color={"#328CC1"} />
                      </p>
                  </div>
                </div>
              </a>
              
              <a target="__blank" href="https://www.desenvolvimentoagil.com.br/scrum/daily_scrum">
                <div className="artigo">
                  <div className="artigo-border"></div>
                  <h3>Daily Scrum</h3>
                  <p>
                    A cada dia do Sprint a equipe faz uma reunião diária, chamada
                    Daily Scrum...
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
              <a href="http://facebook.com">
                <img src={facebook_icon} alt="Logo Facebook" />
              </a>
              <a href="http://linkedin.com">
                <img src={linkedin_icon} alt="Logo linkedin" />
              </a>
              <a href="http://instagram.com">
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
              <input type="text" name="nome" placeholder="Nome" required />
              <br />
              <input type="email" name="email" placeholder="Email" required />
              <br />
              <input type="tel" name="tel" placeholder="Telefone" required />
              <br />
            </div>
            <div>
              <p className="textoCinza">Preferência de comunicação por:</p>
              <br />
              <ul className="preferences-choice">
                <li className="preference">
                  <input
                    type="radio"
                    name="prefComunic"
                    id="prefTel"
                    value="prefTel"
                  />
                  <label className="textoCinza" htmlFor="prefTel">
                    Telefone
                  </label>
                </li>

                <li className="preference">
                  <input
                    type="radio"
                    name="prefComunic"
                    id="prefEmail"
                    value="prefEmail"
                  />
                  <label className="textoCinza" htmlFor="prefEmail">
                    Email
                  </label>
                </li>
              </ul>
              
              

              <br />
              <br />
            </div>
            <div className="textoForm">
              <label className="textoCinza" htmlFor=" formMsg">
                Como podemos ajudar?
              </label>
              <br />
              <textarea name="" id="formMsg" cols="30" rows="3"></textarea>
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
                  duration={350}>
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
                  duration={350}>
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
                  duration={350}>
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
                  duration={350}>
                Contato
                </Link>
              </li>
            </ul>
          </div>
          <p>Todos os direitos reservados 2020 &copy; | Scrunner</p>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
}
