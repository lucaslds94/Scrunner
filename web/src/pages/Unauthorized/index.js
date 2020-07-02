import React from "react";
import { useHistory } from "react-router-dom";

import { MdKeyboardBackspace } from "react-icons/md";

import bubbleA from "../../assets/bubbleA.svg";
import bubbleB from "../../assets/bubbleB.svg";
import unauthorized from "../../assets/unauthorized.svg";
import logo from "../../assets/LogoScrunnerHorizontal.svg";
import BackButton from "../../components/ButtonAction";

import "./styles.css";

const Unauthorized = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.goBack();
  };

  return (
    <div className="notfound-container">
      <img src={bubbleA} className="bolhaA" alt="Bolha A" />
      <img src={bubbleB} className="bolhaB" alt="Bolha B" />
      <div className="notfound-content">
        <img className="notfound-logo" src={logo} alt="Scrunner logo" />
        <img className="notfound-hand" src={unauthorized} alt="Not found" />
        <p>Você não está autorizado a fazer isso.</p>
        <BackButton
          ButtonText="Voltar"
          ButtonIcon={MdKeyboardBackspace}
          size={28}
          onClick={handleRedirect}
        />
      </div>
    </div>
  );
};

export default Unauthorized;
