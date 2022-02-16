/**
 * Copyright (c) University of Technology Sydney. All rights reserved.
 * See LICENSE file in the project root for full license information.
 *
 * Purpose: The Q Web App
 * Author: Thien Phuc Ho
 */

import React, {useRef, useState} from 'react';
import styles from './DraggingGate.module.scss';
import Gate from "../Gate";
import {Gate as GateClass} from "../../../../common/classes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import {
    addDroppedGate, removeDraggingGate, updateDraggingGateExtension,
    updateDraggingGatePosition
} from "../../../../redux/actions/circuitConfigAction";
import {DIMENSIONS} from "../../../../common/constants";
import GateExtension from "../../GateExtension/GateExtension";
import {GateExtension as GateExtClass} from "../../../../common/classes";
import DraggableGateExtension from "../../GateExtension/DraggableGateExtension/DraggableGateExtension";
import {IDraggableGate} from "../../../../common/interfaces";

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

        var {newX, newY} = getSnapToGridPositionFloor(bBox.x, bBox.y);

        var dist = newY - draggingGate.dragStartPosition.y;
        const diff = draggingGate.gateExtension.targetY + dist - newY;
        var offset;
        var newYOffset;
        if (dist > 0) {
            console.log(`moved down ${newY - draggingGate.dragStartPosition.y}` );
        } else {
            console.log(`moved up ${newY - draggingGate.dragStartPosition.y}` );
        }

        if (diff > 0) {
            offset = draggingGate.gateExtension.targetY + dist;
            console.log(`target below ${draggingGate.gateExtension.targetY + dist - newY}`);
            newYOffset = newY;
        } else {
            newYOffset = getSnapToGridPositionCeiling(bBox.y);
            offset = draggingGate.gateExtension.targetY + newYOffset - draggingGate.dragStartPosition.y;
            console.log(`target above ${draggingGate.gateExtension.targetY + dist - newY}`);
        }
        console.log('newYOffset', newYOffset);

        const newGateExt = new GateExtClass(newX, newY, width, height, offset, "", 'CNOT_TARGET');
        const newDroppedGate = new GateClass(newX, newYOffset, width, height, draggingGate.qubitIds, draggingGate.type, 'pi/2', newGateExt, draggingGate.droppedFromMenu);

        dispatch(addDroppedGate(newDroppedGate));
        dispatch(removeDraggingGate());
    }




    const handleDraggableMouseLeft = () => {
        if (draggingGate.dragStartPosition.x !== draggingGate.x && draggingGate.dragStartPosition.y !== draggingGate.y) {
            return;
        }
        console.log("Not dragging anywhere, add dropped gate at previous position");


        // console.log(`moved ${draggingGate.dragStartPosition.y - draggingGate.y}` )
        const newGateExt = new GateExtClass(draggingGate.x, draggingGate.y, width, height, draggingGate.gateExtension.targetY, "", 'CNOT_TARGET');
        const newDroppedGate = new GateClass(draggingGate.x, draggingGate.y, width, height, draggingGate.qubitIds, draggingGate.type, 'pi/2', newGateExt, draggingGate.droppedFromMenu);

        // const gateToUpdate = new GateClass(draggingGate.x, draggingGate.y, width, height,
        // draggingGate.qubitIds, draggingGate.type, 'pi/2');
        dispatch(removeDraggingGate());
        dispatch(addDroppedGate(newDroppedGate));

    }



    return <g ref={draggingGateRef} className={styles.draggingGate}
              onMouseDown={handleDraggableMouseDown}
              onMouseUp={handleDraggableMouseUp}
              onMouseLeave={handleDraggableMouseLeft}>
        {
            draggingGate.gateExtension ?  <DraggableGateExtension gateX={draggingGate.x} gateY={draggingGate.y}
                                                                  targetY={draggingGate.gateExtension.targetY + (draggingGate.y - draggingGate.dragStartPosition.y)}
                                                                  type={draggingGate.gateExtension.type}/>
                : null
        }

        <Gate
            x={draggingGate.x} y={draggingGate.y} width={width} height={height} type={draggingGate.type}
            isAttachment={false} rotAngle={draggingGate.rotAngle}/>





    </g>
}

export default DraggingGate;

/**
 * This function takes x, y co-ordinates of a gate and
 * round those values to the nearest grid position (floor y)
 * @param x
 * @param y
 */
export const getSnapToGridPositionFloor = (x : number, y : number) => {
    const roundX = Math.floor(x / DIMENSIONS.GRID.WIDTH ) *  DIMENSIONS.GRID.WIDTH;
    const roundY = Math.floor(y / DIMENSIONS.GRID.HEIGHT ) *
        DIMENSIONS.GRID.HEIGHT + DIMENSIONS.GRID.PADDING.TOP;
    return {newX : roundX, newY: roundY}
}

/**
 * This function takes y co-ordinate of a gate and
 * round those values to the nearest grid position (ceiling y)
 * @param y
 */
export const getSnapToGridPositionCeiling = (y : number) => {
    const roundY = Math.ceil(y / DIMENSIONS.GRID.HEIGHT ) *
        DIMENSIONS.GRID.HEIGHT + DIMENSIONS.GRID.PADDING.TOP;
    return roundY;
}
