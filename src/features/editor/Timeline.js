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

export function Timeline({ seconds, player, seekTo, playAt, extractionProgress }) {
  const dispatch = useDispatch();
  const frames = useSelector(selectFrames);
  const loadedFramesNum = useSelector(setLoadedFramesNum);
  const [previewImage, setPreviewImage] = useState('https://149359300.v2.pressablecdn.com/wp-content/uploads/2019/11/placeholder.png');
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
    setProgress(index);
    playAt(index);
  }


  function toggleKeyFrame(index, status = false) {
    console.log('toggle:' + index);
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

  function updatePosition(index) {
    setStatusText("Mouse is on " + secondsToMinutes(index));
  }

  function moveImg(event, isKey, imgAddr) {

    if (isKey && imgAddr) {
      setPreviewImage(imgAddr);
      var x = event.clientX;
      var y = event.clientY - 146;
      
      var preview = document.getElementById("preview");

      preview.style.visibility = 'visible';
      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    }
  }

  function hidePreview() {
      var preview = document.getElementById("preview");
      preview.style.visibility = 'hidden';
  }

  return (
    <div>
      <div onMouseMove="moveImg(event)">
        <img height={146} width={261} style={{ position: 'absolute', visibility: 'hidden', borderStyle: 'solid', borderWidth: '1px' , borderColor: 'grey' }} src={previewImage} id='preview' />
      </div>
      <div class="controlPane">
        <span>[Keyframes Extraction Status: {extractionProgress}% extracted]</span>
        <span class="helperText">{statusText}</span>
        <div class="controlButtons">
          <span> {secondsToMinutes(Math.floor(progress))} /{secondsToMinutes(seconds)} </span>
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
            key={index}
            onMouseOver={() => updatePosition(index)}
            class="item"
            style={{ display: 'flex', backgroundColor: frame.isKey ? 'lightgray' : 'white' }}
          >
            <div class="view" style={{ display: 'flex', width: 10, flex: 3 }} onMouseLeave={()=>hidePreview()} onMouseEnter={(e) => { moveImg(e, frame.isKey, frame.imgAddr) }} onDoubleClick={() => skipToKeyFrame(index, frame.imgAddr)} onClick={() => { frame.isKey ? viewKeyFrame(index) : toggleKeyFrame(index, frame.isKey) }}></div>
            {frame.isKey ? (<div class="remove" style={{ display: 'flex', justifyContent: 'center', backgroundColor: frame.isExtracted ? 'aquamarine' : 'pink', flex: 1 }} onClick={() => toggleKeyFrame(index, frame.isKey)}>x</div>) : (<div style={{ display: 'flex', flex: 0 }} class="none"></div>)}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}