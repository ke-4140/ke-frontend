import React, { useState } from 'react';
import styles from './Button.css';
//todo: disable state color schemes s
export function Button({
  onClick,
  iconBefore, //icon before label
  label, //text 
  iconAfter, //icon after label
  width = '150px',
  height= '25px' // (large, medium, small) 
}) {
  return (
    <div type="button" className="button" style={{width: width, height: height}} onClick={onClick}>
      <span className="label">{label}</span>
    </div>
  )
}