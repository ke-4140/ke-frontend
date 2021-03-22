import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { Timeline } from './Timeline'
import YouTube from 'react-youtube';
import StyledContentLoader from 'styled-content-loader'

export function Editor() {

  const [youtubeID, setYoutubeID] = useState("iJDoc0kvXLc");
  const [playerObj, setPlayerObj] = useState(null);
  const [seconds, setSeconds] = useState(800);
  const [isLoading, setIsLoading] = useState(true);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (e) => {
    console.log(e.target);
    setPlayerObj(e.target);
    setSeconds(e.target.getDuration());
    setIsLoading(false);
    e.target.playVideo();
  }

  function onStateChange(e) {
    console.log(e.target.getCurrentTime());
  }

  function onFrameSelect(second) {
    console.log("seek to: ", second);
    playerObj.seekTo(second);
    playerObj.playVideo();
  }

  return (
    <div>
      <Header />

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '400px', margin: 20 }}>
        <div>
          <span>Instruction</span>
          <ol>
            <li> Add Keyframe by pressing a frame on Timeline </li>
            <li> Remove keyframe by pressing a Keyframe on Timeline </li>
            <li> Export when you feel good about all the Keyframes </li>
          </ol>
        </div>
        <YouTube videoId={youtubeID} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      </div>

      {!isLoading ? (
        <Timeline isLoading={isLoading} seconds={seconds} player={playerObj} onFrameSelect={onFrameSelect} />
      ) : (
        <></>
      )}

    </div >
  );
}
