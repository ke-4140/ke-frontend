import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';
import { Card } from '../../components/Card'

export function Uploader() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [link, setLink] = useState('');

  return (
    <div>
      <Card flexDirection='column' width="800px" height="100px">
        <div>
          <span>Paste Youtube Link: </span>
          <input type="url" value={link} onChange={(value)=> setLink(value)}></input>
        </div>
        <span> or </span>
        <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
          <span>Upload Video:  </span>
          <input type="file" name="VideoToUpload" id="VideoToUpload" />
          <input type="submit" value="Upload" name="submit" />
        </div>
      </Card>
    </div>
  );
}
