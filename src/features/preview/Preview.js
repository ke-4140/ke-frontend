import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { PDFTemplate } from './PDFTemplate'

export function Preview() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <Header />
      <div style={{display: 'flex', marginRight: 20, marginBottom: 10, justifyContent: 'flex-end'}}>
        <Button label="Back"></Button>
        <Button label="Export"></Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '400px', marginInline: 20 }}>
        <div>
          <span>Options</span>
          <Card width={400} height={800} flexDirection={'column'}>
          
          </Card>
        </div>
        <div>
          Preview
          <div>
          <PDFTemplate/>
          </div>
        </div>
      </div>
    </div>
  );
}
