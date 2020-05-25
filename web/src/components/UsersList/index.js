import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

import ModalConfirmAction from "../ModalConfirmAction";

import { Lottie } from "@crello/react-lottie";
import animEmptyTeamList from "../../assets/animations/emptyTeamList.json";

export default function UsersList({ colaboratorsData = [], removeUserTeam }) {
  const [showModalConfirmAction, setShowModalConfirmAction] = useState(false);
  const [colaboratorId, setColaboratorId] = useState(0);
  const [teamId, setTeamId] = useState(0);

  const handleConfirmRemove = (colaboratorId, teamId) => {
    setColaboratorId(colaboratorId);
    setTeamId(teamId);
    setShowModalConfirmAction(true);
  };

  const handleRemove = () => {
    removeUserTeam(colaboratorId, teamId);
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

        {colaboratorsData.length === 0 ? (
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
                {colaboratorsData.length !== 0
                  ? colaboratorsData.map((colaborator) => {
                      return colaborator.teams.map((team) => (
                        <ul key={uuid()}>
                          <li>{colaborator.name}</li>
                          <li>{team.name}</li>
                          <li>{team.isLeader ? "Sim" : "Não"}</li>
                          <li>
                            <button
                              onClick={() =>
                                handleConfirmRemove(colaborator.id, team.id)
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
