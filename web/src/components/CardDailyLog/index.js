import React from "react";

import { FaCrown } from "react-icons/fa";
import "./styles.css";

export default function CardDailyLog({
    Leader = false,
    LeaderText = " ",
    ColabText1 = " ",
    ColabText2 = " ",
    ColabText3 = " ",
    Nome = " "
}) {

    

    return (
        <div className="cardDailyLog-container">
            <div className="dailyLog-header">
                <div className="userAvatar avatarLog"></div>
                <p> { Nome } </p>
                {Leader ? (
                     <span className="LeaderCrown"> <FaCrown size={20} color={'#B2B2B2'} /> </span>
                ) : 
                ('')}
            </div>

            <div className="dailyLog-body">
                {Leader ? (
                     <p>
                        {LeaderText}
                     </p>
                ) : (

                    <div className="answer-container">
                        <div className="answer-blocks">
                            <span> • O que você fez ontem? </span>
                            <p> {ColabText1} </p>
                        </div>

                        <div className="answer-blocks">
                            <span> • O que você irá fazer hoje? </span>
                            <p> {ColabText2} </p>
                        </div>

                        <div className="answer-blocks">
                            <span> • Existe/existiu algum impedimento no seu caminho? </span>
                            <p> {ColabText3} </p>
                        </div>
                    </div>

                )}
               
            </div>

        </div>

    )
}