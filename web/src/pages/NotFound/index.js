import React from "react";
import { useHistory } from "react-router-dom";

import { MdKeyboardBackspace } from "react-icons/md";

import bubbleA from "../../assets/bubbleA.svg";
import bubbleB from "../../assets/bubbleB.svg";
import notfound from "../../assets/notfound.svg";
import logo from "../../assets/LogoScrunnerHorizontal.svg";

import BackButton from "../../components/ButtonAction";

import "./styles.css";

const NotFound = () => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/dashboard");
  };

  return (
    <div className="notfound-container">
      <img src={bubbleA} className="bolhaA" alt="Bolha A" />
      <img src={bubbleB} className="bolhaB" alt="Bolha B" />
      <div className="notfound-content">
        <img className="notfound-logo" src={logo} alt="Scrunner logo" />
        <img className="notfound-hand" src={notfound} alt="Not found" />
        <p>Parece que esta página não existe.</p>

        <BackButton
          className="back-button"
          ButtonText="Voltar"
          ButtonIcon={MdKeyboardBackspace}
          size={28}
          onClick={handleRedirect}
        />
      </div>
    </div>
  );
};

export default NotFound;
