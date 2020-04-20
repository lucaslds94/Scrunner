import React from "react";

import "./styles.css";

import logoRoxo from "../../assets/logo_roxo_100.png";

export default function Header({ userName = "Estevan Gomes" }) {
  return (
    <div className="dashboardHeader">
      <div className="logoContainer">
        <img src={logoRoxo} alt="Logo Scrunner" />
        <span>Scrunner</span>
      </div>
      <div className="headerUserName">
        <p>{userName}</p>
        <div className="userAvatar" />
      </div>
    </div>
  );
}
