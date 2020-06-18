import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

import ModalConfirmAction from "../ModalConfirmAction";

import { Lottie } from "@crello/react-lottie";
import animEmptyTeamList from "../../assets/animations/emptyTeamList.json";

export default function UsersList({ collaboratorsData = [], removeUserTeam }) {
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false);
  const [collaboratorId, setCollaboratorId] = useState(0);
  const [teamId, setTeamId] = useState(0);

  const handleConfirmRemove = (collaboratorId, teamId) => {
    setCollaboratorId(collaboratorId);
    setTeamId(teamId);
    setShowModalConfirmAction(true);
  };

  const handleRemove = () => {
    removeUserTeam(collaboratorId, teamId);
    setShowModalConfirmAction(false);
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
        <h2 className="listTitle">Colaboradores</h2>

        {collaboratorsData.length === 0 ? (
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
              <p>Time</p>
              <p>Líder</p>
              <p>Ação</p>
            </div>
            <div className="usersList">
              <div className="listRow">
                {collaboratorsData.length !== 0
                  ? collaboratorsData.map((collaborator) => {
                      return collaborator.teams.map((team) => (
                        <ul key={uuid()}>
                          <li>
                            <div className="userAvatar">
                              <img
                                src={collaborator.image_url}
                                alt={collaborator.name}
                              />
                            </div>
                            {collaborator.name}
                          </li>

                          <li>{team.name}</li>
                          <li>{team.isLeader ? "Sim" : "Não"}</li>
                          <li>
                            <button
                              onClick={() =>
                                handleConfirmRemove(collaborator.id, team.id)
                              }
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
          </>
        )}
      </article>
    </>
  );
}
