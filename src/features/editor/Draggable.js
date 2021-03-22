import React from 'react';
import { useDrag, useDrop } from "react-dnd";

export default function SimpleDragAndDropComponent({ itemId }) {
  const ref = React.createRef();

  const [, connectDrag] = useDrag({
    item: { id: itemId, type: "SIMPLE_COMPONENT", created: "10:06" }
  });
  const [, connectDrop] = useDrop({
    accept: "SIMPLE_COMPONENT",
    hover(item) {
      console.log("Hovering item. id: ", item.id, " created: ", item.created);
      console.log("Hovered over item with id: ", itemId);
    }
  });

  connectDrag(ref);
  connectDrop(ref);

  return <div ref={ref}>Item: {itemId}</div>;
}