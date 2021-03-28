import React from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Uploader } from './features/uploader/Uploader';
import './App.css';

function App() {


  return (
    <div className='app'>
      <Header />
      <h1>Videos to  Frames with Key Extractor</h1>
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
        <Uploader />
      </div>
      <div className='menu'>
        <Card flexDirection='column'>
          <h3>Editor </h3>
          <span></span>
          <Button label="Demo"></Button>

        </Card>
        <Card flexDirection='column'>
          <h3>Preview</h3>
          <Button label="Demo"></Button>

        </Card>
        <Card flexDirection='column'>
          <h3>Export</h3>
          <Button label="Demo"></Button>
        </Card>
      </div>
    </div>
  );
}

export default App;
