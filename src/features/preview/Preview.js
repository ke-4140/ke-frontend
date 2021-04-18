import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PDFTemplate } from './PDFTemplate'
import { selectContents, selectAttributes, processFrameScriptTuple } from '../systemSlice';

export function Preview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const contents = useSelector(selectContents);
  const attributes = useSelector(selectAttributes);
  const [title, setTitle] = useState('New Note');
  const [enableTranscript, switchEnableTranscript] = useState(true);
  const [enableKFA, switchEnableKFA] = useState(true);

  useEffect(() => {
    setTitle("KE_" + attributes.title)
    dispatch(processFrameScriptTuple(4)); //reduce frame scripts duples to group of 4. 
  }, []);

  function triggerPrint() {
    console.log('TriggeredPrint')
    document.getElementById('toPrint').style.overflow = 'unset';
    document.getElementById('hide').style.display = 'none';
    document.getElementById('hideHeader').style.display = 'none';
    document.getElementById('hideButtons').style.display = 'none';
    document.title = title;
    window.print();
    document.getElementById('hide').style.display = 'flex';
    document.getElementById('hideButtons').style.display = 'flex';
    document.getElementById('hideHeader').style.display = 'block';
    document.getElementById('toPrint').style.overflow = 'scroll';
  }

  function finishPreview() {
    history.push("/");
  }

  return (
    <div id='original'>
      <div id='hideHeader'>
        <Header />
      </div>
      <div id='hideButtons' style={{ display: 'flex', marginRight: 20, marginBottom: 10, justifyContent: 'flex-end' }}>
        <Button label="Back" onClick={() => { history.push("editor") }}></Button>
        <Button label="Finish" onClick={() => finishPreview()}></Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
        <div id='hide' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginInline: 20 }}>
          <Card height={'auto'} width={'auto'} flexDirection={'column'}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', margin: 5 }}>

                <h2>Export Options</h2>

                <br />

                <div style={{ display: 'flex', flexDirection: 'column' }} >
                  <div style={{ fontWeight: "bold" }}>Page Title</div>
                  <input style={{ width: 180, margin: 5 }} type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </div>

                <br />

                <div style={{ display: 'flex', flex: 1 , flexDirection: 'column'}}>
                  <div style={{ fontWeight: "bold" }}>Cover Page</div>
                  <div  style={{ display: 'flex', flex: 1 , flexDirection: 'row'}}>
                  <input type="checkbox" id="KFA" name="KFA" checked={enableKFA} onChange={() => switchEnableKFA(!enableKFA)}></input>
                  <div>Enable Cover Page</div>
                  </div>
                </div>

                <br />
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Button label="Print as PDF" onClick={() => triggerPrint()}></Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginInline: 20 }}>
          <div id="toPrint" style={{ overflowY: 'scroll', height: 580, display: 'block', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginInline: 20 }}>
            {enableKFA ? (<PDFTemplate title={title} contents={contents} attributes={attributes} KFA={true} />) : (<></>)}
            <PDFTemplate title={title} contents={contents} KFA={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
