import React from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Uploader } from './features/uploader/Uploader';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Header/>
      <Card width='100%' flexDirection='column' height='200px'> 
        <h1>Videos to  Frames with Key Extractor</h1> 
      </Card>

      <Card width='100%' height='100px' flexDirection='column'> 
        <Uploader/>
      </Card>

      <Card width='100%' > 
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
          <span>Preview</span>
          <Button label="Demo"></Button>
        </Card>
      </Card>
      
    </div>
  );
}

export default App;
