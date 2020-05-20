import React from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

export default function UsersList({ colaboratorsData = [], removeUserTeam }) {
  return (
    <article className="listContainer">
      <h2 className="listTitle">Colaboradores</h2>
      <div className="titleContainer">
        <p>Nome</p>
        <p>Time</p>
        <p>Líder</p>
        <p>Ação</p>
      </div>
      <div className="usersList">
        <div className="listRow">
          {colaboratorsData.length !== 0
            ? colaboratorsData.map((colaborator) => {
                return colaborator.teams.map((team) => (
                  <ul key={uuid()}>
                    <li>{colaborator.name}</li>
                    <li>{team.name}</li>
                    <li>{team.isLeader ? "Sim" : "Não"}</li>
                    <li>
                      <button
                        onClick={() => removeUserTeam(colaborator.id, team.id)}
                        className="remove-button"
                      >
                        Remover
                      </button>
                    </li>
                  </ul>
                ));
              })
            : null}
        </div>
      </div>
    </article>
  );
}
