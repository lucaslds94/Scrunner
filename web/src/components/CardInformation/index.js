import React from "react";

import { Link } from 'react-router-dom'

import { FaUsers , FaCrown } from "react-icons/fa";

import "./styles.css";

export default function CardInformation({
  cardTitle,
  subTitle,
  number,
  buttonText = "Clique aqui",
  crown = false,
  toPage = "#"
}) {
  return (
    <Link to={toPage} className="card">
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
    </Link>
  );
}
