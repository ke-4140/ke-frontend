import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Card } from './components/Card';
import './App.css';
import YouTube from 'react-youtube';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { postYoutubeSrc, submitURL } from "../src/features/systemSlice";

function App() {

  const dispatch = useDispatch();
  const [link, setLink] = useState('https://www.youtube.com/watch?v=a6sNwOSAxoo');
  const demoLinks = [
    {
      url: "https://www.youtube.com/watch?v=-dhMbVEreII",
      name: "How To Build A Chrome Extension (2021 Web Development)",
      vid_time: '27:15',
      pdf: ''
    },
    {
      url: "https://www.youtube.com/watch?v=mQpureQcEXM",
      name: "Webinar: Continuous Delivery with Docker, Kubernetes, and GoCD",
      vid_time: '50:17',
      pdf: ''

    },
    {
      url: "https://www.youtube.com/watch?v=a6sNwOSAxoo",
      name: "Styles & Theming in React Native - a webinar by Haris Mahmood",
      vid_time: '1:23:56',
      pdf: ''
    }
  ];
  const history = useHistory();

  function submitURL(link) {
    // sample 1: https://www.youtube.com/watch?v=6u7aQV_2-2U
    // sample 2: https://www.youtube.com/watch?v=QiTq5WrWoJw

    //@TODO: error checking if its a youtube link
    dispatch(postYoutubeSrc(link, history));
  }

  function downloadPdf(pdf) {

  }

  const opts = {
    height: '120',
    width: '213',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className='app'>
      {/* <Header />
      <h1>Videos to  Frames with Key Extractor</h1>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <div>
          <Card flexDirection='row' width="814px" height="100px">
            <div>
              <span>Paste Youtube Link: </span>
              <input class="input" type="text" value={link} onChange={(e) => setLink(e.target.value)}></input>
            </div>
            <Button label="Ready to Edit" onClick={() => submitURL(link)}></Button>
          </Card>
        </div> */}
      {/* <Header /> */}
      <div style={{ marginTop: 100, display: "flex", alignItems: "center", justifyContent: "center", }}>
        <div style={{ width: 814 }}>
          <Link to="/" style={{ fontWeight: "bolder", textDecoration: "none", color: "black" }}>Keyframe Extractor</Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <h1 style={{ position: "relative" }}>
          Extract what matters in a video
          <div style={{
            position: "absolute",
            left: 514,
            top: 100,
          }}>
            <img src="landing-image.png"
              style={{
                width: 300,
              }} />
          </div>
        </h1>
        <div className="subheading">
          Detect key frames, transcribe video, export PDF.
          <br />
          All can be done in a few clicks.
        </div>

        <div style={{
          marginBottom: 60,
          width: 814
        }}>
          <span>Tired of watching hour-long videos?</span>

          <div style={{ height: 8 }} />

          <div style={{
            display: "flex",
            width: "fit-content",
            flexDirection: "row",
            backgroundColor: "white",
            // border: "1px solid black",
            padding: 8,
            borderRadius: 5,
            boxShadow: "5px 10px 20px #DADADA",
          }}>
            <input className="input" type="text" value={link} onChange={(e) => setLink(e.target.value)}></input>
            <Button label="Ready to Edit" onClick={() => submitURL(link)}></Button>
          </div>
        </div>
      </div>

      <div style={{height: 50, textAlign: "center", marginTop: 30}}>
        Demo
      </div>

      <div className='menu'>
        {/* const [demoLink, setDemoLink] = useState('https://www.youtube.com/watch?v=a6sNwOSAxoo'); */}
        <Card flexDirection='row' width="814px" height="340px">
          {demoLinks.map((demoLink, i) => (
            <div style={{ display: 'flex', height: 300, flexDirection: 'column', alignItems: "center", textAlign: 'center', justifyContent: 'space-around' }}>
              <YouTube videoId={demoLink.url.split('=')[1]} opts={opts} />
              <span> {demoLink.name} </span>
              <text> Duration: {demoLink.vid_time}</text>
              <Button label="Try the Demo" onClick={() => submitURL(demoLink.url)}></Button>
              <Button label="Download Result PDF" onClick={() => downloadPdf(demoLink.pdf)}></Button>
            </div>
          ))}

        </Card>
      </div>

      <div style={{ height: 40 }} />

    </div>
  );
}

export default App;
