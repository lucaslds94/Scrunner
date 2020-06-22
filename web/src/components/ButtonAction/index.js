import React from "react";

import { FaPlus } from "react-icons/fa";

import "./styles.css";

export default function ButtonAction({
  ButtonText = "None",
  ButtonIcon = FaPlus,
  size = 20,
  onClick,
}) {
  return (
    <>
      <button onClick={onClick} className="action-button">
        <ButtonIcon size={size} />
        <span> {ButtonText} </span>
      </button>
    </>
  );
}
