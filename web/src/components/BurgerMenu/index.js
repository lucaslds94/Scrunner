import React, { useState } from "react";

import { Link } from "react-scroll";

import "./styles.css";

export default function BurgerMenu() {
  const [showBurger, setShowBurger] = useState(false);

  const handleClickOption = () => {
    setShowBurger(false);
  };

  return (
    <>
      <aside onClick={() => setShowBurger(!showBurger)} id="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </aside>
      {showBurger && (
        <div className="burger-fade">
          <button onClick={() => setShowBurger(false)} />
        </div>
      )}

      <div className={`menu-options-burger ${showBurger && "active-burger"}`}>
        <ul className="menu-list">
          <li>
            <Link
              onClick={handleClickOption}
              activeClass="active"
              to="porqueScrunner"
              spy={false}
              smooth={true}
              offset={-70}
              duration={300}
            >
              Por que usar Scrunner?
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClickOption}
              activeClass="active"
              to="aplicacoes"
              spy={false}
              smooth={true}
              offset={-70}
              duration={300}
            >
              Aplicações
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClickOption}
              activeClass="active"
              to="metodologias"
              spy={false}
              smooth={true}
              offset={-20}
              duration={300}
            >
              Metodologias Ágeis
            </Link>
          </li>
          <li>
            <Link
              onClick={handleClickOption}
              activeClass="active"
              to="contato"
              spy={false}
              smooth={true}
              offset={-120}
              duration={300}
            >
              Contatos
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
