import React, { useState } from "react";

import "./styles.css";

import { getLocalStorage } from "../../utils/localStorage";

import ModalConfirmAction from "../ModalConfirmAction";

import { Lottie } from "@crello/react-lottie";
import animEmptyTeamList from "../../assets/animations/emptyTeamList.json";

export default function TeamMembersList({ collaborators = [], removeUserTeam }) {
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false);
  const [collaboratorId, setCollaboratorId] = useState(0);

  const handleConfirmRemove = (collaboratorId) => {
    setCollaboratorId(collaboratorId);

    setShowModalConfirmAction(true);
  };

  const handleRemove = () => {
    removeUserTeam(collaboratorId);
    setShowModalConfirmAction(false);
  };

  const removeOwnerFromCollaborators = () => {
    return collaborators.filter((collaborator) => !collaborator.is_owner);
  };

  const showButtonRemove = (userId) => {
    const user = getLocalStorage("@Scrunner:user");

    return user.id === userId;
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

        {removeOwnerFromCollaborators().length === 0 ? (
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
                {removeOwnerFromCollaborators().map((collaborator) => {
                  return (
                    <ul key={collaborator.id}>
                      <li>
                        <div className="userAvatar"></div>
                        {collaborator.name}
                      </li>
                      <li>{collaborator.is_leader ? "Líder" : "Membro"}</li>
                      <li>
                        {!showButtonRemove(collaborator.id) && (
                          <button
                            onClick={() => handleConfirmRemove(collaborator.id)}
                            className="remove-button"
                          >
                            Remover
                          </button>
                        )}
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
