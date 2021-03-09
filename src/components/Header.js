import {Link} from 'react-router-dom'; 
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';
// import styles from './Counter.module.css';

export function Header() {
  return (
    <div className="App">
      <ul className="App-header">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/uploader">Upload</Link>
        </li>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
        <li>
          <Link to="/preview">Preview</Link>
        </li>
        <li>
          <Link to="/download">Download</Link>
        </li>
      </ul>
    </div>
  );
}


