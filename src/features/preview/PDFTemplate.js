import React from 'react';
export function PDFTemplate({ contents = [], attributes = "loading", KFA = true }) {
  var blockCounts = 0;

  function getToday() {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return utc;
  }

  return (
    <div style={{ width: 595 - 44, height: 595 * 1.618 - 44, padding: 24 }}>
      {KFA ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 16, weight: 595 - 44, height: 962 }} >
          <div style={{ height: 50 }}></div>
          <div style={{ display: 'flex', border: '1px solid black', height: 146, width: 261, justifyContent: 'center', alignItems: 'center' }}>
            <img src={contents[0].frame} height={322} width={522} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height: 200}}>
            <span>Video Title:</span>
            <text> {attributes.title}</text>
            <span>Video Duration:</span>
            <text> {attributes.duration}</text>
            <span> # of Extracted Keyframes:  </span>
            <text>{contents.length} </text>
            <span> Date of Extraction:  </span>
            <text>{getToday()} </text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
            <span>© Keyframe Extractor 2021 </span>
          </div>
          <div class="pagebreak"></div>
        </div>) : (
        <div>
          {contents.map((content, index) => (
            <div key={index}>
              <div style={{ display: 'none' }}>{blockCounts += content.layoutTypeRows} </div>
              {blockCounts > 5 ? (<div class="pagebreak"><div style={{ display: 'none' }}>{blockCounts = content.layoutTypeRows}</div></div>) : <></>}
              {content.layoutTypeRows == 1 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', border: '1px solid black', height: 146, width: 261, justifyContent: 'center', alignItems: 'center' }}>
                    <img src={content.frame} height={146} width={261} />
                  </div>
                  <textarea resize='auto' rows="10" defaultValue={content.transcript} style={{ width: 261, height: 144 }}>
                  </textarea>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column', marginTop: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', marginBottom: 16, border: '1px solid black', height: 146, width: 261, justifyContent: 'center', alignItems: 'center' }}>
                    <img src={content.frame} height={146} width={261} />
                  </div>
                  <textarea resize='auto' rows={content.layoutTypeRows == 2 ? "10" : (content.layoutTypeRows == 3 ? "22" : "33")} defaultValue={content.transcript + ":" + content.layoutTypeRows + ":" + content.transcript.length} style={{ width: 546 }}>
                  </textarea>
                </div>
              )}
            </div>
          ))}
        </div>)}
    </div>
  );
}