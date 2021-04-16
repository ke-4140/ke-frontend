import React from 'react';
export function PDFTemplate({ contents = [], title = "Nice Slides", KFA = false }) {
  var blockCounts = 0;
  return (
    <div style={{ width: 595 - 44, height: 595 * 1.618 - 44, padding: 24 }}>
      {KFA ? (
        <div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 16, marginBottom: 16, border: '1px solid black', weight: 546, height: 640 }} >
          KFA Content
        </div>) : (
        <div>
          {contents.map((content, index) => (
            <div key={index}>
              <div style={{ display: 'none' }}>{blockCounts += content.layoutTypeRows} </div>
              {blockCounts > 5 ? (<div class="pagebreak"><div style={{ display: 'none' }}>{blockCounts = 0}</div></div>) : <></>}

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
                  <textarea resize='auto' rows={content.layoutTypeRows == 2 ? "10" : (content.layoutTypeRows == 3 ? "22" : "33")} defaultValue={content.transcript} style={{ width: 546 }}>
                  </textarea>
                </div>
              )}
            </div>
          ))}
        </div>)}
    </div>
  );
}