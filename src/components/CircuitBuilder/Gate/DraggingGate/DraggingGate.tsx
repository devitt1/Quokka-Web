import React, {useRef} from 'react';
import styles from './DraggingGate.module.scss';
import Gate from "../Gate";
import {Gate as GateClass} from "../../../../common/classes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import {
    addDroppedGate, removeDraggingGate,
    updateDraggingGatePosition
} from "../../../../redux/actions/circuitConfigAction";

interface DraggingGateProps {
    xOffset: number,
    yOffset: number;
    x: number,
    y: number,
    width : number,
    height : number,
}

const DraggingGate : React.FC<DraggingGateProps> = (children) => {
    const {xOffset, yOffset, width, height} = children;
    const {draggingGate} = useSelector((state: RootState) => state.circuitConfig);
    const dispatch = useDispatch();
    const draggingGateRef : any = useRef(null);

    const handleDraggableMouseDown = (e : any) => {
        console.log(`Mouse down at dragging gate type ${draggingGate.type}`);
        document.addEventListener('mousemove', handleDraggableMouseMove.current);

    }

    const handleDraggableMouseMove = useRef((e : any) => {
        const newX = e.clientX - xOffset - width/3;
        const newY = e.clientY - yOffset - height/2;
        dispatch(updateDraggingGatePosition(newX, newY));

    });

    const handleDraggableMouseUp = (event : any) => {
        document.removeEventListener('mousemove', handleDraggableMouseMove.current);
        const draggingGateElem = draggingGateRef.current;
        const bBox = draggingGateElem.getBBox();
        const roundX = Math.floor(bBox.x / 48 ) * 48;
        const roundY = Math.floor(bBox.y / 39) * 39;

        const newColIndex = roundX / 48;
        const newRowIndex = roundY / 39;

        const newDroppedGate = new GateClass(roundX, roundY, width, height, newRowIndex, newColIndex, draggingGate.type);
        dispatch(addDroppedGate(newDroppedGate));
        dispatch(removeDraggingGate());
    }


    const handleDraggableMouseLeft = () => {
        console.log(`Mouse left at dragging gate at cell [${draggingGate.rowIndex}, ${draggingGate.colIndex}]`);
        if (draggingGate.dragStartPosition.x !== draggingGate.x && draggingGate.dragStartPosition.y !== draggingGate.y) {
            return;
        }

        console.log("Not dragging anywhere, add dropped gate at previous position");

        const gateToUpdate = new GateClass(draggingGate.x, draggingGate.y, width, height, draggingGate.rowIndex, draggingGate.colIndex, draggingGate.type);
        dispatch(removeDraggingGate());
        dispatch(addDroppedGate(gateToUpdate));

    }


    return <g ref={draggingGateRef} className={styles.draggingGate}
              onMouseDown={handleDraggableMouseDown}
              onMouseUp={handleDraggableMouseUp}
              onMouseLeave={handleDraggableMouseLeft}

    >
      <Gate  x={draggingGate.x} y={draggingGate.y} width={width} height={height} type={draggingGate.type}/>
    </g>
}

export default DraggingGate;
