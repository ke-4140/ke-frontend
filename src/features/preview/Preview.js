import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PDFTemplate } from './PDFTemplate'
import { selectFrameScriptDuple, selectContents, selectPdfTotalPages, processFrameScriptDuple } from '../systemSlice';
import StyledContentLoader from 'styled-content-loader'

export function Preview() {
  const dispatch = useDispatch();
  const contents = useSelector(selectContents);
  const pdfTotalPages = useSelector(selectPdfTotalPages);
  const [title, setTitle] = useState('New Note');

  useEffect(() => {
    dispatch(processFrameScriptDuple(4)); //reduce frame scripts duples to group of 4. 
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', marginRight: 20, marginBottom: 10, justifyContent: 'flex-end' }}>
        <Button label="Back"></Button>
        <Button label="Export"></Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginInline: 20 }}>
        <Card width={400} height={600} flexDirection={'column'}>
          <div> Options</div>
          <div> Title:
          <input class="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>Export Format:</div>
            </div>
            < div>
              <div>
                <input type="radio" id="ft" name="gender" value="ft" />
                <label for="ft">Frames and Transcript</label>
              </div>
              <div>
                <input type="radio" id="fe" name="gender" value="fe" />
                <label for="fe">Frames and Empty Area for Notetaking</label>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>Enable Transcript: </div>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>Enable Key Frame Analysis: </div>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
            </div>
          </div>
        </Card>
        <Card width={800} height={600} flexDirection={'row'}>
          <div>Preview</div>
          <div style={{ height: 600, overflowY: 'scroll' }}>
            
            {contents ? (
              contents.map((contents, index) =>
                <PDFTemplate title={title} contents={contents} pageNo={index+1} totalPagesNum={pdfTotalPages} />
              )
            ): <StyledContentLoader/>}


          </div>
        </Card>
      </div>
    </div >
  );
}
