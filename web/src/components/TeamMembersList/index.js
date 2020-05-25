import React, { useState } from "react";

import "./styles.css";

import ModalConfirmAction from "../ModalConfirmAction";

import { Lottie } from "@crello/react-lottie";
import animEmptyTeamList from "../../assets/animations/emptyTeamList.json";

export default function TeamMembersList({ colaborators = [], removeUserTeam }) {
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false);
  const [colaboratorId, setColaboratorId] = useState(0);

  const handleConfirmRemove = (colaboratorId) => {
    setColaboratorId(colaboratorId);

    setShowModalConfirmAction(true);
  };

  const handleRemove = () => {
    removeUserTeam(colaboratorId);
    setShowModalConfirmAction(false);
  };

  const removeOwnerFromColaborators = () => {
    return colaborators.filter((colaborator) => !colaborator.is_owner);
  };

  return (
    <>
      {showModalConfirmAction && (
        <ModalConfirmAction
          handleConfirmAction={handleRemove}
          handleCloseModalConfirmAction={() => setShowModalConfirmAction(false)}
        />
      )}

      <article className="listContainer">
        <h2 className="listTitle">Membros</h2>

        {removeOwnerFromColaborators().length === 0 ? (
          <>
            <Lottie
              config={{
                animationData: animEmptyTeamList,
                loop: true,
                autoplay: true,
              }}
            />
          </>
        ) : (
          <>
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
                          onClick={() => handleConfirmRemove(colaborator.id)}
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
          </>
        )}
      </article>
    </>
  );
}
