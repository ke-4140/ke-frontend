import React, {useState} from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Card } from './components/Card';
import './App.css';
import YouTube from 'react-youtube';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { postYoutubeSrc, submitURL} from "../src/features/systemSlice";

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

  function downloadPdf(pdf){

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
      <Header />
      <h1>Videos to  Frames with Key Extractor</h1>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <div>
          <Card flexDirection='row' width="814px" height="100px">
            <div>
              <span>Paste Youtube Link: </span>
              <input class="input" type="text" value={link} onChange={(e) => setLink(e.target.value)}></input>
            </div>
            {/* <span> or </span>
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <span>Upload Video:  </span>
          <input type="file" name="VideoToUpload" id="VideoToUpload" />
        </div> */}
            <Button label="Ready to Edit" onClick={() => submitURL(link)}></Button>
          </Card>
        </div>
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
    </div>
  );
}

export default App;
