import React, { useState } from 'react';
import styles from './Timeline.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export function Timeline() {

  const [frames, setFrames] = useState([
    {
      id: "1",
      value: "a"
    },
    {
      id: "2",
      value: "b"
    },
    {
      id: "3",
      value: "c"
    },
    {
      id: "4",
      value: "d"
    },
  ]);
  const [width, changeWidth] = useState(500);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedFrames = reorder(
      frames,
      result.source.index,
      result.destination.index
    );
    setFrames(reorderedFrames);

  }
  console.log(width);
  return (
    <div>
      <div class="controlPane">
        <span>Timeline</span>
        <div class="controlButtons">
          <button onClick={() => changeWidth(width + 10)}>
            +
          </button>
          <button onClick={() => changeWidth(width - 10)}>
            -
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="drappable" direction="horizontal">
          {(provided) => (
            <div class="wrapper" ref={provided.innerRef} {...provided.droppableProps}>
              {frames.map((frame, index) =>
                <Draggable draggableId={frame.id} index={index} key={frame.id}>
                  {(provided, snapshot) => {
                    var style = {
                      width: width,
                      ...provided.draggableProps.style,
                    }
                    return (
                      <div
                        class="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={style}
                      >
                        {frame.value}
                      </div>
                    );
                  }}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
