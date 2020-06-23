import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import "./styles.css";
import { useState } from "react";
import { toast } from "react-toastify";

import ToolTip from "../ToolTip";

export default function ModalCreateTask({
  handleModalCreateTask,
  createTaskContent,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskPoints, setTaskPoints] = useState("");

  const handleCreateTaskContent = () => {
    if (title.trim().length === 0) {
      return toast.error("Insira um título válido");
    }
    if (description.trim().length === 0) {
      return toast.error("Insira uma descrição válida");
    }
    if (
      taskPoints < 1 ||
      taskPoints > 100 ||
      taskPoints.length === 0 ||
      !Number.isInteger(Number(taskPoints))
    ) {
      return toast.error(
        "Os pontos devem ser inteiros e estar dentro do intervalo de 1 a 100"
      );
    }

    createTaskContent({ title, description, task_points: taskPoints });
    handleModalCreateTask();
  };

  return (
    <div className="modal-create-task">
      <div className="modal-fade">
        <button onClick={handleModalCreateTask}></button>
      </div>
      <div className="modal-container-create-task">
        <div className="container-center-create-task">
          <button id="closeModal" type="button" onClick={handleModalCreateTask}>
            <FaTimes size={20} color={"#737FF3"} />
          </button>
          <h1>Adicionar tarefa</h1>
          <div className="divider" />

          <div className="create-task-field">
            <label htmlFor="title">Título</label>
            <br />
            <input
              maxLength="50"
              type="input"
              name="title"
              className="text-create-task"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="create-task-field">
            <label htmlFor="description">Descrição</label>
            <br />
            <textarea
              maxLength="255"
              type="input"
              name="description"
              id="description"
              value={description}
              className="text-create-task"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="container-input-button">
            <div className="task-points-container">
              <label htmlFor="task-points">Pontos</label>
              <br />
              <input
                type="number"
                placeholder="1 ~ 100"
                name="task-points"
                id="task-points"
                value={taskPoints}
                onChange={(e) => setTaskPoints(e.target.value)}
              />

              <ToolTip
                width={"200px"}
                title={
                  "Pontos que se referem ao grau de dificuldade da tarefa."
                }
              >
                <FiAlertCircle size={20} />
              </ToolTip>
            </div>

            <div className="divBotao">
              <button
                className="btnCriarDaily"
                onClick={handleCreateTaskContent}
              >
                <FaCheck />
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
