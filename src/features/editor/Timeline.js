import React, { useState, useEffect } from 'react';
import styles from './Timeline.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { addLoadedFramesNum, setLoadedFramesNum, fetchNewKeyFrame, selectFrames } from '../systemSlice';

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export function Timeline({ seconds, player, seekTo, playAt, extractionProgress, hoverPreview}) {
  const dispatch = useDispatch();
  const frames = useSelector(selectFrames);
  const loadedFramesNum = useSelector(setLoadedFramesNum);
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

  function loadsMore() {
    console.log('loads more, current:', loadedFramesNum);
    dispatch(addLoadedFramesNum());

  }

  function viewKeyFrame(index) {
    setProgress(index);
    seekTo(index);
  }


  function skipToKeyFrame(index, img) {
    console.log(img);
    hoverPreview(img);
    setProgress(index);
    playAt(index);
  }


  function toggleKeyFrame(index, status = false) {
    console.log('toggle:' + index);
    // const newFrames = [...frames];
    // newFrames[index].isKey = !newFrames[index].isKey;
    status = !status;
    dispatch(fetchNewKeyFrame(parseInt(index), status));
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
        <span>[Keyframes Extraction Status: {extractionProgress}% extracted]</span>
        <div class="controlButtons">
          <span> {secondsToMinutes(Math.floor(progress))} /{secondsToMinutes(seconds)} </span>
          {/* <button onClick={() => changeWidth(width + 10)}>
            +
          </button>
          <button onClick={() => changeWidth(width - 10)}>
            -
          </button> */}
        </div>
      </div>

      <div class="progressBar">
        {/* {console.log(progress/seconds)} */}
        <div class="ExtractProgressNode" style={{ width: `${extractionProgress}%` }} />
        <div class="TimeProgressNode" style={{ width: `${progress / seconds * 100}%` }} />
      </div>

      <InfiniteScroll
        dataLength={loadedFramesNum} //This is important field to render the next data
        next={loadsMore}
        hasMore={true}
        className="wrapper">
        {frames.slice(0, loadedFramesNum).map((frame, index) =>
          <div
            onH
            class="item"
            style={{ display: 'flex', backgroundColor: frame.isKey ? 'lightgray' : 'white' }}
          >
            <div class="view" style={{ display: 'flex', width: width, flex: 3 }} onDoubleClick={() => skipToKeyFrame(index, frame.imgAddr)} onClick={() => { frame.isKey ? viewKeyFrame(index) : toggleKeyFrame(index, frame.isKey) }}></div>
            {frame.isKey ? (<div class="remove" style={{ display: 'flex', justifyContent: 'center', backgroundColor: frame.isExtracted ? 'aquamarine' : 'pink', flex: 1 }} onClick={() => toggleKeyFrame(index, frame.isKey)}>x</div>) : (<div style={{ display: 'flex', flex: 0 }} class="none"></div>)}
          </div>
        )}
      </InfiniteScroll>

      <div class="helperText">{statusText}   </div>
    </div>
  );
}