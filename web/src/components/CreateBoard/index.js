import React from "react";

import { FaPlus } from "react-icons/fa";
import "./styles.css";

export default function CreateBoard({handleCreateBoard}) {
  return (
    <div onClick={handleCreateBoard} className="create-board">
      <FaPlus size={30} color={"#737FF3"} />
      <p>Adicionar novo quadro</p>
    </div>
  );
}
