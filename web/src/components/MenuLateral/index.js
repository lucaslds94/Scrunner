import React from "react";
import { Link } from "react-router-dom";
import { clearLocalStorage } from "../../utils/localStorage";
import { useHistory } from "react-router-dom";

import { FaHome, FaPowerOff } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";

import "./styles.css";

export default function MenuLateral({ homeActive = true, isProfile = false }) {
  const history = useHistory();

  const handleLogOff = () => {
    clearLocalStorage();
    history.push("/");
  };

  return (
    <div className="container-aside">
      <aside className="menuLateral">
        <Link
          to={"/dashboard"}
          className={`btnMenuLateral ${!isProfile && homeActive && "active"}`}
        >
          <FaHome className="iconMenuLateral" size={22} /> Início
        </Link>
        <Link
          to={"/times"}
          className={`btnMenuLateral ${!isProfile && !homeActive && "active"}`}
        >
          <TiGroup className="iconMenuLateral" size={22} />
          Times
        </Link>
        <button className="logoff-button" onClick={handleLogOff}>
          <FaPowerOff size={24} color={"#FFF"} />
        </button>
      </aside>
    </div>
  );
}
