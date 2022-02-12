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
    qubitIds: string[]
    width : number,
    height : number,
    type : GateTypes,
    rotAngle : string,
}

const DroppedGate : React.FC<DroppedGateProps> = (children) => {
    const {x, y, id, width, height, qubitIds, type, rotAngle} = children;
    const dispatch = useDispatch();

    const handleMouseEnter = (event : any) => {
        const gateToUpdate = new DraggableGate(x, y,{x: x, y: y}, width, height, qubitIds, type, rotAngle);
        dispatch(removeDroppedGate(id));
        dispatch(updateDraggingGate(gateToUpdate));
    }


    return (<g className={styles.droppedGate}
            onMouseEnter={handleMouseEnter}
    >
            <Gate x={x} y={y} width={width} height={height} type={type as GateTypes} rotAngle={rotAngle} isAttachment={false}/>
    </g>)
}

export default DroppedGate;
