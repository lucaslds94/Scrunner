import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

import ModalCofirmAction from "../ModalConfirmAction";
import ModalCreateTask from "../ModalCreateTask";

import moment from "moment";
import "moment/locale/pt-br";

import "./styles.css";

function Kanban({ tasksColumns = [], deleteTask, createTask, moveTask }) {
  const [columns, setColumns] = useState({});
  const [showModalConfirmDel, setShowModalConfirmDel] = useState(false);
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [idTaskToDelete, setIdTaskToDelete] = useState("");
  const [taskColumn, setTaskColumn] = useState(0);

  useEffect(() => {
    const kanbanColumns = {
      [tasksColumns[0].id]: {
        id: tasksColumns[0].id,
        name: tasksColumns[0].name,
        tasks: tasksColumns[0].tasks,
      },
      [tasksColumns[1].id]: {
        id: tasksColumns[1].id,
        name: tasksColumns[1].name,
        tasks: tasksColumns[1].tasks,
      },
      [tasksColumns[2].id]: {
        id: tasksColumns[2].id,
        name: tasksColumns[2].name,
        tasks: tasksColumns[2].tasks,
      },
    };

    setColumns(kanbanColumns);
  }, [tasksColumns]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];

      const [removed] = sourceItems.splice(source.index, 1);

      moveTask(destination.droppableId, removed.id);

      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];

      const copiedItems = [...column.tasks];

      const [removed] = copiedItems.splice(source.index, 1);

      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  const ConfirmDeleteTask = (taskId) => {
    setIdTaskToDelete(taskId);
    setShowModalConfirmDel(true);
  };

  const handleDeleteTask = () => {
    setShowModalConfirmDel(false);
    deleteTask(idTaskToDelete);
  };

  const handleClickCreateTask = (columnId) => {
    setTaskColumn(columnId);
    setShowModalCreateTask(true);
  };

  const handleCreateTask = (data) => {
    const dataObj = {
      task_column: taskColumn,
      ...data,
    };
    createTask(dataObj);
  };

  return (
    <>
      {showModalConfirmDel && (
        <ModalCofirmAction
          handleCloseModalConfirmAction={() => setShowModalConfirmDel(false)}
          handleConfirmAction={handleDeleteTask}
        />
      )}
      {showModalCreateTask && (
        <ModalCreateTask
          handleModalCreateTask={() => setShowModalCreateTask(false)}
          createTaskContent={handleCreateTask}
        />
      )}
      <div className="kanbanContainer">
        <div className="kanbanGrid1" />
        <div className="kanbanGrid2" />
        <div className="kanbanGrid3" />
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div className="columnContainer" key={columnId}>
                <h2>{column.name}</h2>
                <div className="marginContainer">
                  <Droppable droppableId={`${columnId}`} key={`${columnId}`}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className="droppableColumn"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#9EA8FF"
                              : "white",
                          }}
                        >
                          {column.tasks.map((task, index) => {
                            return (
                              <Draggable
                                key={`${task.id}`}
                                draggableId={`${task.id}`}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className="kanbanCard"
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#F5F5F5"
                                          : "#FFF",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <button
                                        onClick={() =>
                                          ConfirmDeleteTask(task.id)
                                        }
                                        className="trashBtn"
                                      >
                                        <BsTrash size={22} color={"#BBB"} />
                                      </button>
                                      <div className="task-information">
                                        <span>
                                          Criado em:{" "}
                                          {moment(task.createdAt).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </span>
                                        <span>Pontos:{task.task_points}</span>
                                      </div>
                                      <div className="task-content">
                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                          <button
                            onClick={() => handleClickCreateTask(columnId)}
                            className="addTask"
                          >
                            <FaPlus size={22} />
                            Adicionar tarefa
                          </button>
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default Kanban;
