import React from 'react';

import { FaHome, } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";

import './styles.css';

export default function MenuLateral() {
  return (
    <aside className="menuLateral">
    <button className ="btnMenuLateral">
      < FaHome className="iconMenuLateral" size= {22}/>Início
    </button>
    <button className ="btnMenuLateral">
      < TiGroup className="iconMenuLateral" size= {22}/>Times
    </button>
    </aside>
  );
};