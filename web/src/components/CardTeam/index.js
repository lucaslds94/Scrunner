import React from "react";
import { v4 as uuid } from "uuid";

import { FaHashtag as Hash } from "react-icons/fa";

import "./styles.css";

export default function CardTeam({
  teamName = "No name",
  teamCategory = "Development",
  teamCode = "No code",
  teamMembers = [],
  isOwner = false,
  toDetailPage,
}) {
  const getOwner = () => {
    const [owner] = teamMembers.filter((member) => member.is_owner);
    return owner.name;
  };

  const teamMembersLength = teamMembers.length - 1;

  return (
    <div onClick={toDetailPage} className="cardTeam-container">
      <h2> {teamName} </h2>
      <div className="cardteam-divider"></div>

      <div className="cardteam-category">
        <div>
          <p> Categoria </p>
          <span> {teamCategory} </span>
        </div>
        {!isOwner && (
          <div>
            <p> Criado por </p>
            <span> {getOwner()} </span>
          </div>
        )}
      </div>

      <p> Código </p>
      <span className="cardteam-code">
        <Hash style={{ color: "#737FF3" }} size={24} />
        {teamCode}
      </span>

      <div className="cardteam-divider"></div>

      <div className="cardteam-members">
        <p> Membros </p>
        <p> {teamMembersLength} </p>
      </div>

      <div className="cardteam-names">
        {teamMembers.slice(1, 3).map((member) => {
          return <p key={uuid()}> {member.name} </p>;
        })}

        {teamMembersLength === 0 ? (
          <span> Este time ainda não possui membros... </span>
        ) : (
          teamMembersLength > 2 && (
            <span> E mais {teamMembersLength - 2} outros... </span>
          )
        )}
      </div>
    </div>
  );
}
