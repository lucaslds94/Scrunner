import React, { useState,useEffect } from "react";
import { getLocalStorage } from '../../utils/localStorage';

import "./styles.css";

import logoRoxo from "../../assets/logo_roxo_100.png";

export default function Header() {
  const user = getLocalStorage("@Scrunner:user");
  
  return (
    <div className="dashboardHeader">
      <div className="logoContainer">
        <img src={logoRoxo} alt="Logo Scrunner" />
        <span>Scrunner</span>
      </div>
      <div className="headerUserName">
        <p>{user.name}</p>
        <div className="header-avatar">
          <img src={user.image_url} alt={user.name}/>
        </div>
      </div>
    </div>
  );
}
