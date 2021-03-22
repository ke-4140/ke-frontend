import React, { useState } from 'react';
import styles from './Timeline.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export function Timeline() {
  const [frames, setFrames] = useState(Array.from({ length: 200 }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    value: "",
    isKey: false
  })));
  const [width, changeWidth] = useState(20);

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

  function markKeyFrame (frameId){
    console.log(frames);
    frames[frameId].isKey=!frames[frameId].isKey;
  }
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
                      background: frame.isKey ? 'red' : 'beige',
                      ...provided.draggableProps.style,
                    }
                    return (
                      <div
                        class="item"
                        ref={provided.innerRef}
                        onClick={()=>markKeyFrame(index)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={style}
                      >
                        {frame.isKey? 'x':''}
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
