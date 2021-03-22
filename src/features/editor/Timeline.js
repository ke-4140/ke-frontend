import React, { useState, useEffect } from 'react';
import styles from './Timeline.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export function Timeline({ seconds, player, onFrameSelect }) {
  const [frames, setFrames] = useState(Array.from({ length: seconds }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    value: "",
    isKey: false
  })));
  const [width, changeWidth] = useState(10);
  const [statusText, setStatusText] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(player.getCurrentTime());
    }
      , 1000);
    return () => clearInterval(interval);
  }, []);

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

  function markKeyFrame(index) {
    // frames[frameId].isKey=!frames[frameId].isKey;
    const newFrames = [...frames];

    newFrames[index].isKey = !newFrames[index].isKey;
    setFrames(newFrames);
    onFrameSelect(index);
    var helperText = newFrames[index].isKey ? "Added" : "Removed";
    setStatusText(helperText + " frame at " + secondsToMinutes(index));
  }

  function secondsToMinutes(s) {
    var m = Math.floor(s / 60);
    var s = s % 60;
    if (s < 10) return `${m}:0${s}`
    else return `${m}:${s}`;
  }

  return (
    <div>
      <div class="controlPane">
        <span>Timeline </span>

        <div class="controlButtons">
          <span> {statusText} /{secondsToMinutes(seconds)} </span>
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
              <div class="progressBar">
                <div class="progressNode" style={{ width: progress  }} />
              </div>
              {frames.map((frame, index) =>
                <Draggable draggableId={frame.id} index={index} key={frame.id}>
                  {(provided, snapshot) => {
                    var style = {
                      width: width,
                      borderWidth: frame.isKey ? 1 : 0,
                      ...provided.draggableProps.style,
                    }
                    return (
                      <div
                        class="item"
                        ref={provided.innerRef}
                        onClick={() => markKeyFrame(index)}
                        disabled={frame.isKey ? false : true}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={style}
                      >
                        {frame.isKey ? '-' : ''}
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