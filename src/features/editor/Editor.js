import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { useDrag } from 'react-dnd';
import { Timeline }from './Timeline'
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';
// import styles from './Counter.module.css';

export function Editor() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  // const [{ opacity }, dragRef] = useDrag(
  //   () => ({
  //     collect: (monitor) => ({
  //       opacity: monitor.isDragging() ? 0.5 : 1
  //     })
  //   }),
  //   []
  // )

  return (
    <div>
      <Header />

      <div style={{ display: 'flex', flexDirection: 'row', height: '400px' }}>
        <div style={{ flex: 2 }}>
          <span>Instruction</span>
        </div>
        <div style={{ flex: 3 }}>
          <iframe width="560px" height="340px"
            src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0?enablejsapi=1">
          </iframe>
        </div>
      </div>

    <Timeline/>

    </div >
  );
}
