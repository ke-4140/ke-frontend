import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PDFTemplate } from './PDFTemplate'
import { selectContents, selectPdfTotalPages, processFrameScriptDuple } from '../systemSlice';

export function Preview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const contents = useSelector(selectContents);
  const pdfTotalPages = useSelector(selectPdfTotalPages);
  const [title, setTitle] = useState('New Note');
  const [enableTranscript, switchEnableTranscript] = useState(true);
  const [enableKFA, switchEnableKFA] = useState(false);

  useEffect(() => {
    dispatch(processFrameScriptDuple(4)); //reduce frame scripts duples to group of 4. 
  }, []);

  function triggerPrint() {
    var printContents = document.getElementById('toPrint').innerHTML;
    var originalContents = document.getElementById('original').innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  function finishPreview(){
    history.push("/");
  }

  return (
    <div id='original'>

      <Header />

      <div style={{ display: 'flex', marginRight: 20, marginBottom: 10, justifyContent: 'flex-end' }}>
        <Button label="Back"></Button>
        <Button label="Finish" onClick={() => finishPreview()}></Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginInline: 20 }}>
      <div> Configs</div>
        <Card height={'20%'} width={'80%'} flexDirection={'column'}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flex: 1, alignItems: 'center' }} > Page Title:
              <input style={{ width: 180, margin: 5 }} class="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
              </div>
              <div style={{ display: 'flex', flex: 2 }} >Export Format:
              <div onChange={() => switchEnableTranscript(!enableTranscript)}>
                  <div>
                    <input type="radio" id="ft" name="ft" value="ft" checked={enableTranscript} />
                    <label for="ft">Frames and Transcript</label>
                  </div>
                  <div>
                    <input type="radio" id="fe" name="fe" value="fe" checked={!enableTranscript} />
                    <label for="fe">Frames only</label>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flex: 1 }}>Enable Key Frame Analysis:
              <input type="checkbox" id="KFA" name="KFA" checked={enableKFA} onChange={() => switchEnableKFA(!enableKFA)}></input>
              </div>
            </div>
          </div>
          <Button label="Print as PDF" onClick={() => triggerPrint()}></Button>
        </Card>

        <div>PDF Preview</div>
        <div id="toPrint" style={{ alignSelf: 'center', height: 600, overflowY: 'scroll' }}>

          {enableKFA ? (<PDFTemplate title={title} pageNo={0} KFA={true} />) : (<> </>)}

          {contents ? (
            contents.map((contents, index) =>
              <PDFTemplate title={title} contents={contents} pageNo={index + 1} totalPagesNum={pdfTotalPages} enableKFA={enableKFA} enableTranscript={enableTranscript} />
            )
          ) : <div>loading...</div>}


        </div>
      </div>
    </div >
  );
}
