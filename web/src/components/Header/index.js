import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../../utils/localStorage";

import { RiArrowDropDownLine } from "react-icons/ri";

import ModalDropdown from "../ModalDropdownPerfil";

import "./styles.css";

import logoRoxo from "../../assets/logo_roxo_100.png";

export default function Header({ userData }) {
  const [user, setUser] = useState({});
  const [showDropdownModal, setShowDropdownModal] = useState(false);

  useEffect(() => {
    if (!userData) {
      const user = getLocalStorage("@Scrunner:user");
      return setUser(user);
    }

    setUser(userData);
  }, [userData]);

  return (
    <>
      <div className="dashboardHeader">
        <div className="logoContainer">
          <img src={logoRoxo} alt="Logo Scrunner" />
          <span>Scrunner</span>
        </div>

        <div
          onClick={() => setShowDropdownModal(!showDropdownModal)}
          className="headerUserName"
        >
          <div className="header-avatar">
            <img src={user.image_url} alt={user.name} />
          </div>
          <RiArrowDropDownLine size={28} color={"#555"} />
        </div>
      </div>
      {showDropdownModal && (
        <ModalDropdown
          {...user}
          handleCloseModal={() => setShowDropdownModal(false)}
        />
      )}
    </>
  );
}
