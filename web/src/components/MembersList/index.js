import React from "react";

import "./styles.css";

export default function MembersList({ users = [] }) {
  return (
    <div className="table-members-container">
      <div className="table-members-header">
        <h1>Membros</h1>
      </div>
      <div className="table-title-members">
        <p>Nome</p>
        <p>Posição</p>
      </div>
      <div className="table-list">
        <div className="table-row">
          <ul>
            {users.map((user) => (
              <div key={user.id} className="list-item">
                <li>
                  <div className="user-image" />
                  {user.name}
                </li>
                <li>{user.isLeader ? "Líder" : "Membro"}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
