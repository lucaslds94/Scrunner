import React from "react";

import { useHistory } from "react-router-dom";


import "./styles.css";

function ModalDropdownPerfil({ image_url, name, email, handleCloseModal }) {
  const history = useHistory();

  const handleNavigateConfigAccount = () => {
    history.push("/perfil");
  };
  return (
    <>
      <div onClick={handleCloseModal} className="dropdown-fade" />
      <div className="dropdown">
        <div className="dropdown-user">
          <div className="dropdown-user-image">
            <img src={image_url} alt={name} />
          </div>
          <div className="dropdown-user-information">
            <p>{name}</p>
            <p>{email}</p>
          </div>
        </div>
        <button
          onClick={handleNavigateConfigAccount}
          className="button-config-user"
        >
          Configurar conta
        </button>
      </div>
    </>
  );
}

export default ModalDropdownPerfil;
