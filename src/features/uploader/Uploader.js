import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../../components/Card'
import { useHistory } from "react-router-dom";
import { Button } from '../../components/Button'
import {
  setYoutubeURL
} from "../systemSlice";

export function Uploader() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [link, setLink] = useState('https://www.youtube.com/watch?v=6u7aQV_2-2U');
  const history = useHistory();


  function submit(){
    // sample 1: https://www.youtube.com/watch?v=6u7aQV_2-2U
    // sample 2: https://www.youtube.com/watch?v=QiTq5WrWoJw

    //@TODO: error checking if its a youtube link
    dispatch(setYoutubeURL(link));
    console.log(link);
    history.push("/editor");
  }
  return (
    <div>
      <Card flexDirection='column' width="800px" height="100px">
        <div>
          <span>Paste Youtube Link: </span>
          <input type="text" value={link} onChange={(e)=> setLink(e.target.value)}></input>
        </div>
        {/* <span> or </span>
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <span>Upload Video:  </span>
          <input type="file" name="VideoToUpload" id="VideoToUpload" />
        </div> */}
        <Button label="Ready to Edit" onClick={()=>submit()}></Button>
      </Card>
    </div>
  );
}
