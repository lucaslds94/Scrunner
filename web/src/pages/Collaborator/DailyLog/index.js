import React, {useState} from "react";
import { useParams, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";
import CardDailyLog from "../../../components/CardDailyLog";
import ModalCriarDaily from "../../../components/ModalCriarDaily";


export default function DailyLog() {
    const [showModal,setShowModal] = useState(false)
    const { name, dailyDate } = useParams();

    return (
        <div className="dailyLog">

            {showModal&&<ModalCriarDaily handleModalCreateDaily={()=>setShowModal(false)}/>}
            <Header userName={"Ana Fonseca"} />
            <MenuLateral homeActive={false} />
            
            <Container>
                <div className="infos-daily">
                    <div className="header-times-daily">
                        <div className="header-titles">
                            <h2>Dailys</h2>
                            <Link to={`/times/detalhes/2/${name}`}>{name}</Link>
                        </div>
                        <div className="header-buttons">
                            <ButtonChangeScreen
                                titleButton={"Dailys"}
                                to={`/times/daily/${name}`}
                                active
                            />
                            <ButtonChangeScreen
                                titleButton={"Tarefas"}
                                to={`/times/tarefa/${name}`}
                            />
                        </div>
                    </div>
                    <div className="divider" />

                    <div className="dailyLogInfo-container">

                        <Link className ="backBtn" to ={`/times/daily/${name}`} >
                            <MdArrowBack size={30} color={"#737FF3"}/> Voltar
                        </Link>

                        <div className="dailyLogInfo" >
                            <h2>{dailyDate}</h2>
                            <h4>{2} registros foram realizados</h4>
                        </div>
                    </div>
                </div>

                <div className="dailyLog-content">
                    
                    <div className="dailyLog-leadText">
                        <CardDailyLog 
                            Leader="true"
                            LeaderText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus dictum at tempor commodo. 
                                Imperdiet sed euismod nisi porta lorem."
                            Nome={"Estevan Gomes"} />
                    </div>

                    <div className="dailyLog-colabText">

                        <button onClick={()=>setShowModal(true)}  className="buttonAddDaily">
                            <FaPlus size={20} color={"#B2B2B2"} />
                            <span> Adicionar registro daily </span>
                        </button>

                        <CardDailyLog 
                            ColabText1="Resposta pergunta 1"
                            ColabText2="Resposta pergunta 2"
                            ColabText3="Resposta pergunta 3"
                            Nome={"Ana Fonseca"} />

                        <CardDailyLog 
                            ColabText1="Resposta pergunta 1"
                            ColabText2="Resposta pergunta 2"
                            ColabText3="Resposta pergunta 3"
                            Nome={"José Augusto"} />
                        
                        
                    </div>
                </div>

                
            </Container>

        </div>
    )

}