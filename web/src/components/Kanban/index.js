import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";

import "./styles.css";

const itemsFromBackend = [
  { id: uuid(), title:"Title1", content: "First task" },
  { id: uuid(), title:"Title2" , content: "Second task" },
  { id: uuid(), title:"Title3" , content: "Third task" },
  { id: uuid(), title:"Title4" , content: "Fourth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
  { id: uuid(), title:"Title5" , content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "To do",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "Doing",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function Kanban() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="kanbanContainer">
      <div className="kanbanGrid1"/>
      <div className="kanbanGrid2"/>
      <div className="kanbanGrid3"/>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className = "columnContainer" key={columnId}>
              <h2>{column.name}</h2>
              <div className = "marginContainer">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        className = "droppableColumn"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#9EA8FF"
                            : "white",
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className = "kanbanCard"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#F5F5F5"
                                        : "#FFF",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <h3>{item.title}</h3>
                                    <p>{item.content}</p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
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
  );
}

export default Kanban;