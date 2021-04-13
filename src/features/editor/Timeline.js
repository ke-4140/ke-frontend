import React, { useState, useEffect } from 'react';
import styles from './Timeline.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectYoutubeURL, selectKeyFrame, selectFrames } from '../systemSlice';

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export function Timeline({ seconds, player, seekTo, playAt }) {
  const dispatch = useDispatch();
  const frames = useSelector(selectFrames);
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
    // setFrames(reorderedFrames);
  }

  function viewKeyFrame(index) {
    setProgress(index);
    seekTo(index);
  }


  function skipToKeyFrame(index) {
    setProgress(index);
    playAt(index);
  }


  function toggleKeyFrame(index, status = false) {
    console.log('toggle:' + index);
    // const newFrames = [...frames];
    // newFrames[index].isKey = !newFrames[index].isKey;
    status = !status;
    dispatch(selectKeyFrame({ index: index, status: status }));
    var helperText = status ? "ADDED" : "REMOVED";
    setStatusText("Last " + helperText + " keyframe at " + secondsToMinutes(index));
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
          <span> {secondsToMinutes(Math.floor(progress))} /{secondsToMinutes(seconds)} </span>
          <button onClick={() => changeWidth(width + 10)}>
            +
          </button>
          <button onClick={() => changeWidth(width - 10)}>
            -
          </button>
        </div>
      </div>

      <div class="progressBar">
        {/* {console.log(progress/seconds)} */}
        <div class="progressNode" style={{ width: `${progress / seconds * 100}%` }} />
      </div>

      <div class="wrapper">
        {frames.map((frame, index) =>
          <div
            class="item"
            disabled={frame.isKey ? false : true}
            style={{backgroundColor: frame.isKey ? 'lightgray' : 'white' }}
          >
            <div class="view" style={{width:width}} onDoubleClick={() => skipToKeyFrame(index)} onClick={() => { frame.isKey ? viewKeyFrame(index) : toggleKeyFrame(index, frame.isKey) }}></div>
            {frame.isKey ? (<div class="remove" style={{ backgroundColor: frame.isExtracted ? 'aquamarine' : 'indianred' }} onClick={() => toggleKeyFrame(index, frame.isKey)}>x</div>) : (<div class="none"></div>)}
          </div>
        )}
      </div>

      <div class="helperText">{statusText}   </div>
    </div>
  );
}