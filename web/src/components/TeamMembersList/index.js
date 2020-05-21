import React from "react";

import "./styles.css";

export default function TeamMembersList({ colaborators = [], removeUserTeam}) {
  const removeOwnerFromColaborators = () => {
    return colaborators.filter((colaborator) => !colaborator.is_owner);
  };

  return (
    <article className="listContainer">
      <h2 className="listTitle">Membros</h2>
      <div className="titleContainer">
        <p>Nome</p>
        <p>Líder</p>
        <p>Ação</p>
      </div>
      <div className="usersList">
        <div className="listRow">
          {removeOwnerFromColaborators().map((colaborator) => {
            return (
              <ul key={colaborator.id}>
                <li>
                  <div className="userAvatar"></div>
                  {colaborator.name}
                </li>
                <li>{colaborator.is_leader ? "Líder" : "Membro"}</li>
                <li>
                  <button
                    onClick={() => removeUserTeam(colaborator.id)}
                    className="remove-button"
                  >
                    Remover
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </article>
  );
}
