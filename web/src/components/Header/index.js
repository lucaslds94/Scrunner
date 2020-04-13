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
      <p>Nome do Indivíduo</p>
    </div>
  
  );
};