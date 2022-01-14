import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const DragDropContextProvider = (props) => {
    return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
};
export default DragDropContextProvider;
