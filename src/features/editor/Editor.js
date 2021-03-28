import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Timeline } from './Timeline'
import YouTube from 'react-youtube';
import StyledContentLoader from 'styled-content-loader'
import {
  selectYoutubeURL
} from '../systemSlice';

export function Editor() {
  const youtubeURL = useSelector(selectYoutubeURL);
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

  function seekTo(second) {
    console.log("seek to: ", second);
    playerObj.seekTo(second);
    playerObj.pauseVideo();
  }

  function playAt(second) {
    console.log("play at: ", second);
    playerObj.seekTo(second);
    playerObj.playVideo();
  }

  return (
    <div>
      <Header />
      <div style={{display: 'flex', marginRight: 20, marginBottom: 10, justifyContent: 'flex-end'}}>
        <Button label="Reset Keyframes"></Button>
        <Button label="Preview PDF"></Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '400px', marginInline: 20 }}>
        <div>
          <span>Instruction</span>
          <ol>
            <li> Add Keyframe by clicking a frame on Timeline. </li>
            <li> Remove Keyframe by clicking (x) on it. </li>
            <li> Move Keyframe by dragging it on Timeline </li>
            <li> Click on Keyframe to view the Keyframe on Video Player </li>
            <li> Double click on frame to play from it</li>
            <li> Export when you feel good about all the Keyframes </li>
            <ul> @TODO: Add current playing frame </ul>
            <ul> @TODO: Match progress bar with Timeline </ul>
            <ul> @TODO: Persist redux (cache link) </ul>
            <ul> @TODO: Differentiate server-created keyframes and user-created keyframes </ul>
          </ol>
        </div>
        <YouTube videoId={youtubeURL.split('=')[1]} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      </div>

      {!isLoading ? (
        <Timeline isLoading={isLoading} seconds={seconds} player={playerObj} seekTo={seekTo} playAt={playAt} />
      ) : (
        <></>
      )}

    </div >
  );
}
