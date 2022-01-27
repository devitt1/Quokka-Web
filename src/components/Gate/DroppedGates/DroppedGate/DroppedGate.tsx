import React, {useEffect} from 'react';
import styles from "./DroppedGate.module.scss";
import Gate from "../../Gate";
import {Gate as GateClass} from "../../../../common/classes";
import {GateType} from "../../../../common/types";
import {useDispatch} from "react-redux";
import {
    addDroppedGate,
    removeDraggingGate,
    removeDroppedGate,
    updateDraggingGate
} from "../../../../redux/actions/circuitConfigAction";


interface DroppedGateProps {
    id: string,
    x: number,
    y: number,
    rowIndex : number,
    colIndex : number,
    width : number,
    height : number,
    type : GateType
}

const DroppedGate : React.FC<DroppedGateProps> = (children) => {
    const {x, y, id, width, height, rowIndex, colIndex, type} = children;
    // const index = key;
    const dispatch = useDispatch();
    const cellXPos = (width + 8) * colIndex;
    const cellYPos = (height + 1) * rowIndex;

    const handleMouseEnter = () => {
        // console.log("Dropped gate key: ", key);
        console.log(`Mouse entered at dropped gate at cell [${rowIndex}, ${colIndex}]`);
        // const gateToRemove = new GateClass(cellXPos, cellYPos, width, height,
        //     rowIndex, colIndex, type);
        dispatch(removeDroppedGate(id));
        const gateToUpdate = new GateClass(cellXPos, cellYPos, width, height, rowIndex, colIndex, type);
        dispatch(updateDraggingGate(gateToUpdate));
    }


    return (<g className={styles.droppedGate}
            onMouseEnter={handleMouseEnter}
    >
            <Gate x={cellXPos} y={cellYPos} width={width} height={height} type={type as GateType}/>
    </g>)
}

export default DroppedGate;
