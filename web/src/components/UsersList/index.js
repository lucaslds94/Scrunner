import React from "react";

import "./styles.css";

export default function UsersList() {
  let usersList = [
    { id: 1, name: "Heisenberg", lastAcess: "Há 2 horas", isLeader: true },
    { id: 2, name: "Jess", lastAcess: "Há 4 horas", isLeader: false },
    { id: 3, name: "Skyle", lastAcess: "Há 6 horas", isLeader: false },
    { id: 4, name: "Saul Goodman", lastAcess: "Há 3 horas", isLeader: false },
    { id: 5, name: "Hank", lastAcess: "Há 4 horas", isLeader: false },
    { id: 6, name: "Walter Jr", lastAcess: "Há 2 horas", isLeader: false },
    { id: 7, name: "Mike", lastAcess: "Há 9 horas", isLeader: false },
    { id: 8, name: "Heisenberg", lastAcess: "Há 2 horas", isLeader: true },
    { id: 9, name: "Jess", lastAcess: "Há 3 horas", isLeader: false },
    { id: 10, name: "Skyle", lastAcess: "Há 2 horas", isLeader: false },
    { id: 11, name: "Saul Goodman", lastAcess: "Há 2 horas", isLeader: false },
    { id: 12, name: "Hank", lastAcess: "Há 2 horas", isLeader: false },
    { id: 13, name: "Walter Jr", lastAcess: "Há 2 horas", isLeader: false },
    { id: 14, name: "Mike", lastAcess: "Há 2 horas", isLeader: false },
  ];
  return (
    <article className="listContainer">
      <h2 className="listTitle">Colaboradores</h2>
      <div className="titleContainer">
        <p>Nome</p>
        <p>Último acesso</p>
        <p>Líder</p>
        <p>Ação</p>
      </div>
      <div className="usersList">
        <div className="listRow">
          {usersList.map((user) => {
            return (
              <ul key={user.id}>
                <li>{user.name}</li>
                <li>{user.lastAcess}</li>
                <li>{user.isLeader ? "Sim" : "Não"}</li>
                <li>Remover</li>
              </ul>
            );
          })}
        </div>
      </div>
    </article>
  );
}
