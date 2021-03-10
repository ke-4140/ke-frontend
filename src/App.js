import React from 'react';
import { Header } from './components/Header';
import { Button } from './components/Button';
import { Card } from './components/Card';
import './App.css';
function App() {
  return (
    <div className='app'>
      <Header/>
      <Card width='100%' flexDirection='column'> 
        <h1>Videos to  Frames with Key Extractor</h1> 
        <span>It is that easy.</span> 
      </Card>

      <Card width='100%' height='100px' flexDirection='column'> 
        Uploader
      </Card>

      <Card width='100%' > 
        <Card flexDirection='column'>
          <span>Topic 1 </span>
          <Button label="Demo"></Button>

        </Card>
        <Card flexDirection='column'>
          <span>Topic 2 </span>
          <Button label="Demo"></Button>

        </Card>
        <Card flexDirection='column'>
          <span>Topic 3 </span>
          <Button label="Demo"></Button>

        </Card>
      </Card>

      
    </div>
  );
}

export default App;
