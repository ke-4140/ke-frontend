import React, { useState } from 'react';
import styles from './Button.css';
//todo: disable state color schemes s
export function Button({
  onClick,
  iconBefore, //icon before label
  label, //text 
  iconAfter, //icon after label
  width = '200px',
  height= '50px' // (large, medium, small) 
}) {
  return (
    <button type="button" className="button" style={{width: width, height: height}} onClick={onClick}>
      <span className="label">{label}</span>
    </button>
  )
}