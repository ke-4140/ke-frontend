import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';
import styles from './Header.css';

export function Header() {
  return (
    <header>
      <div className="topNavBar">
        <div><Link className="logo" to="/">KE</Link></div>
          {/* <Link className="tabItem" to="/">Home</Link>
          <Link className="tabItem" to="/uploader">Upload</Link>
          <Link className="tabItem" to="/editor">Editor</Link>
          <Link className="tabItem" to="/preview">Preview</Link>
          <Link className="tabItem" to="/download">Download</Link> */}
      </div>
      {/* <hr className="divider" class="solid"></hr> */}
    </header>
  );
}