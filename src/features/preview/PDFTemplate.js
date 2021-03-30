import React, { useState, useEffect } from 'react';

export function PDFTemplate({
  contents = [{
    frame: "https://images.unsplash.com/photo-1616788590183-c6b1d59a9b78?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    transcript: "testing script 1",
  },
  {
    frame: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    transcript: "testing script 2",
  },
  {
    frame: "https://images.unsplash.com/photo-1616788590183-c6b1d59a9b78?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    transcript: "testing script 3",
  },
  {
    frame: "https://images.unsplash.com/photo-1616788590183-c6b1d59a9b78?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    transcript: "testing script 4",
  }]
  , pageNo = 1, totalPagesNum = 20, title = "Nice Slides", logo = "KE" }) {

  useEffect(() => {

  }, []);

  function getToday() {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    return utc;
  }

  return (
    <div style={{ height: 842-48, width: 595-48, border: '1px solid black', padding: 24, margin: 12}}>
      <div style={{ display: 'flex', height: 20, justifyContent: 'flex-end'}}>
        <div>{logo} </div>
      </div>
      <div style={{ display: 'flex', height: 60, alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: 'row' }}>
        <div>{title} </div>
        <div>created on KE on {getToday()} </div>
      </div>
      {contents.map((content, index) => (

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop: 16, marginBottom: 16}}>
          <div style={{ display: 'flex', border: '1px solid black', height: 146, width: 261, justifyContent: 'center', alignItems: 'center' }}>
            <img src={content.frame} height={146} width={261} />
          </div>
          <textarea rows="10" style={{ resize: 'none', width: 261, height: 144 }}>
            {content.transcript}
          </textarea>
        </div>

      ))}

      <div style={{ display: 'flex',justifyContent: 'flex-end'}}>

        <div> {pageNo}/{totalPagesNum} </div>

      </div>
    </div>
  );
}