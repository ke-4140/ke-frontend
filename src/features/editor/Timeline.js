import React, { useState } from 'react';
import styles from './Timeline.css';

export function Timeline() {

  const [items, changeItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const [width, changeWidth] = useState(90);
  return (
    <div>

      <div class="controlPane">
        <span>Timeline</span>
        <div class="controlButtons">
          <button onClick={()=>changeWidth(width+10)}>
            +
          </button>
          <button onClick={()=>changeWidth(width-10)}>
            -
          </button>
        </div>
      </div>
      <div class="wrapper">
        {items.map((value) =>
          <div class="item" style={{ minWidth: width }}>{value}</div>
        )}
      </div>

    </div>
  );
}
