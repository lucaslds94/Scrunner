import React from "react";

import { useHistory } from "react-router-dom";

import { FaUsers, FaCrown } from "react-icons/fa";

import "./styles.css";

export default function CardInformation({
  copyCode,
  cardTitle,
  subTitle,
  number,
  buttonText = "Clique aqui",
  crown = false,
  toPage = "#",
  isClickable = false,
  isCopyable = false,
  onClick,
}) {
  const history = useHistory();

  const handleCardClick = () => {
    if (isClickable) {
      if (toPage !== "#") {
        return history.push(toPage);
      }

      return onClick();
    }

    if (isCopyable) {
      return copyCode();
    }
  };

  return (
    <div onClick={handleCardClick} className="card">
      <div className="card-information">
        <p className="card-title">{cardTitle}</p>
        <p>
          <strong>{number}</strong> {subTitle}
        </p>
        <button>{buttonText}</button>
      </div>
      {crown ? (
        <FaCrown size={25} color={"#fff"} />
      ) : (
        <FaUsers size={25} color={"#fff"} />
      )}
    </div>
  );
}
