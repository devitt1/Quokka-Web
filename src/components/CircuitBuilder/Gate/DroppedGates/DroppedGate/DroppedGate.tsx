import React, {useEffect} from 'react';
import styles from "./DroppedGate.module.scss";
import Gate from "../../Gate";
import {DraggableGate, Gate as GateClass} from "../../../../../common/classes";
import {GateTypes} from "../../../../../common/types";
import {useDispatch} from "react-redux";
import {
    addDroppedGate,
    removeDraggingGate,
    removeDroppedGate,
    updateDraggingGate
} from "../../../../../redux/actions/circuitConfigAction";


interface DroppedGateProps {
    id: string,
    x: number,
    y: number,
    rowIndex : number,
    colIndex : number,
    qubitIds: string[]
    width : number,
    height : number,
    type : GateTypes
}

const DroppedGate : React.FC<DroppedGateProps> = (children) => {
    const {x, y, id, width, height, rowIndex, colIndex, qubitIds, type} = children;
    const dispatch = useDispatch();

    const handleMouseEnter = (event : any) => {
        console.log(`Mouse entered at dropped gate at cell [${rowIndex}, ${colIndex}]`);
        const gateToUpdate = new DraggableGate(x, y,{x: x, y: y}, width, height, rowIndex, colIndex, qubitIds, type);
        dispatch(removeDroppedGate(id));
        dispatch(updateDraggingGate(gateToUpdate));
    }


    return (<g className={styles.droppedGate}
            onMouseEnter={handleMouseEnter}
    >
            <Gate x={x} y={y} width={width} height={height} type={type as GateTypes}/>
    </g>)
}

export default DroppedGate;
