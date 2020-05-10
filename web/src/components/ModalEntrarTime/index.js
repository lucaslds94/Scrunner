import React from "react";

import "./styles.css";

import { FaTimes, FaCheck, FaHashtag  } from "react-icons/fa";

import ButtonAction from '../ButtonAction';

export default function ModalEntrarTime({
  handleModalEnterTeam,
  handleModalEnterTeamBtn,
})

{
  return (
    <>
      <div className="modal-codigo">
        <div className="modal-fade"></div>

        <div className="modalContainer-codigo-EntrarTime">
          <div className="mainContainer-codigo">
            <div className="titleContainerEntrarTime">
            <h3>Entrar em time</h3>
            <button type="button" onClick={handleModalEnterTeam}>
              <FaTimes size={20} color={"#737FF3"} />
            </button>
            </div>

            <div className="containerCode">
              <div className="divAux">
                <FaHashtag size= {20}/>
                <h5>Código do time</h5>
              </div>
              <input type="text" id="inputEntrarTime" placeholder="Dígite o código"></input>
              <ButtonAction 
              ButtonText = "Entrar"
              ButtonIcon = {FaCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
