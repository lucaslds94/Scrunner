import React from 'react';
import {Link} from 'react-router-dom';

import { FaHome, } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";

import './styles.css';

export default function MenuLateral() {

  return (
    <aside className="menuLateral">
    <Link to="/dashboard" className="btnMenuLateral">
      <FaHome className="iconMenuLateral" size= {22}/>Início
    </Link >
    <Link to="/times" className ="btnMenuLateral">
      <TiGroup className="iconMenuLateral" size= {22}/>Times
    </Link>
    </aside>
  );
};