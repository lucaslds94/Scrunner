import React, { useState,useEffect } from "react";
import { getLocalStorage } from '../../utils/localStorage';

import { FaUserNinja } from 'react-icons/fa';

import "./styles.css";

import logoRoxo from "../../assets/logo_roxo_100.png";

export default function Header() {
  const [userName,setUserName]= useState("");

  useEffect(() => {
    const userStorage = getLocalStorage("@Scrunner:user");

    setUserName(userStorage.name);
  }, []);

  return (
    <div className="dashboardHeader">
      <div className="logoContainer">
        <img src={logoRoxo} alt="Logo Scrunner" />
        <span>Scrunner</span>
      </div>
      <div className="headerUserName">
        <p>{userName}</p>
        <div className="header-avatar">
          <FaUserNinja  size={25} color={"#FFF"} />
        </div>
      </div>
    </div>
  );
}
