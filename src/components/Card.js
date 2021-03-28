import React, { useState } from 'react';
import styles from './Card.css';
//todo: disable state color schemes s
export function Card({
  onPress,
  iconBefore, //icon before label
  label, //text 
  iconAfter, //icon after label
  width = '250px',
  height = '300px',
  flexDirection = 'row', // (large, medium, small)
  children
}) {
  return (
    <div type="card" className="card" style={{ width: width, height: height, flexDirection: flexDirection}} onClick={onPress}>
      {children}
    </div>
  )
}