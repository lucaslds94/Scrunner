import React from 'react';

import './styles.css';

import logoRoxo from '../../assets/logo_roxo_100.png';

export default function Header() {
  return (
   
    <div className="dashboardHeader">
      <div className="logoContainer">
      <img src={logoRoxo} alt="Logo Scrunner"/>
      <span>Scrunner</span>
      </div>
      <div className="headerUserName">
        <p>Estevan Gomes</p>
      <div className="userAvatar"/>
      </div>
    </div>
  
  );
};