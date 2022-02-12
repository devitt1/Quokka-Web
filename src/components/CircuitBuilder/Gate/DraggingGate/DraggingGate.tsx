/**
 * Copyright (c) University of Technology Sydney. All rights reserved.
 * See LICENSE file in the project root for full license information.
 *
 * Purpose: The Q Web App
 * Author: Thien Phuc Ho
 */

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
import {DIMENSIONS} from "../../../../common/constants";

/**
 * @param xOffset x position relative to cursor pointer x
 * @param yOffset y position relative to cursor pointer y
 */
interface DraggingGateProps {
    xOffset: number,
    yOffset: number;
    x: number,
    y: number,
    width : number,
    height : number,
}

/**
 *
 * @param children
 * @constructor
 */
const DraggingGate : React.FC<DraggingGateProps> = (children) => {
    const {xOffset, yOffset, width, height} = children;
    const {draggingGate} = useSelector((state: RootState) => state.circuitConfig.circuitState);
    const dispatch = useDispatch();
    const draggingGateRef : any = useRef(null);

    const handleDraggableMouseDown = (e : any) => {
        console.log(`Mouse down at dragging gate type ${draggingGate.type}`);
        document.addEventListener('mousemove', handleDraggableMouseMove.current);

    }

    const handleDraggableMouseMove = useRef((e : any) => {
        const newX = e.clientX - xOffset - width/2;
        const newY = e.clientY - yOffset - height/2;
        dispatch(updateDraggingGatePosition(newX, newY));

    });

    const handleDraggableMouseUp = (event : any) => {
        document.removeEventListener('mousemove', handleDraggableMouseMove.current);
        const draggingGateElem = draggingGateRef.current;
        const bBox = draggingGateElem.getBBox();
        const roundX = Math.floor(bBox.x / 48 ) * 48;
        const roundY = Math.floor(bBox.y / 64 ) * 64 + 21;

        const {newX, newY} = getSnapToGridPosition(bBox.x, bBox.y);
        const newColIndex = roundX / 48;
        const newRowIndex = roundY / 39;

        const newDroppedGate = new GateClass(newX, newY, width, height, draggingGate.qubitIds, draggingGate.type, 'pi/2');
        dispatch(addDroppedGate(newDroppedGate));
        dispatch(removeDraggingGate());
    }




    const handleDraggableMouseLeft = () => {
        if (draggingGate.dragStartPosition.x !== draggingGate.x && draggingGate.dragStartPosition.y !== draggingGate.y) {
            return;
        }
        console.log("Not dragging anywhere, add dropped gate at previous position");

        const gateToUpdate = new GateClass(draggingGate.x, draggingGate.y, width, height,
        draggingGate.qubitIds, draggingGate.type, 'pi/2');
        dispatch(removeDraggingGate());
        dispatch(addDroppedGate(gateToUpdate));

    }


    return <g ref={draggingGateRef} className={styles.draggingGate}
              onMouseDown={handleDraggableMouseDown}
              onMouseUp={handleDraggableMouseUp}
              onMouseLeave={handleDraggableMouseLeft}

    >
      <Gate x={draggingGate.x} y={draggingGate.y} width={width} height={height} type={draggingGate.type}
            isAttachment={false} rotAngle={draggingGate.rotAngle}/>
    </g>
}

export default DraggingGate;

/**
 * This function takes x, y co-ordinates of a gate and
 * round those values to the nearest grid position
 * @param x
 * @param y
 */
export const getSnapToGridPosition = (x : number, y : number) => {
    const roundX = Math.floor(x / DIMENSIONS.GRID.WIDTH ) *  DIMENSIONS.GRID.WIDTH;
    const roundY = Math.floor(y / DIMENSIONS.GRID.HEIGHT ) *
        DIMENSIONS.GRID.HEIGHT + DIMENSIONS.GRID.PADDING.TOP;
    return {newX : roundX, newY: roundY}
}
