import React, {useEffect, useRef, useState} from 'react';
import styles from "./DroppedGate.module.scss";
import Gate from "../../Gate";
import {DraggableGate, Gate as GateClass} from "../../../../../common/classes";
import {GateTypes} from "../../../../../common/types";
import {useDispatch, useSelector} from "react-redux";
import {
    removeDroppedGate,
    updateDraggingGate, updateDroppedGateExtension
} from "../../../../../redux/actions/circuitConfigAction";
import {DIMENSIONS} from "../../../../../common/constants";
import {RootState} from "../../../../../redux/reducers/rootReducer";
import {IGateExtension} from "../../../../../common/interfaces";
import GateExtension from "../../../GateExtension/GateExtension";
import {GateExtension as GateExtClass} from "../../../../../common/classes";
import DraggableGateExtension from "../../../GateExtension/DraggableGateExtension/DraggableGateExtension";
import Grid from "../../../CircuitArrangement/Grid/Grid";


interface DroppedGateProps {
    id: string,
    x: number,
    y: number,
    qubitIds: string[]
    width : number,
    height : number,
    type : GateTypes,
    rotAngle : string,
    gateExtension : IGateExtension
    droppedFromMenu: boolean
}

const DroppedGate : React.FC<DroppedGateProps> = (children) => {
    const {x, y, id, width, height, qubitIds, type, rotAngle, gateExtension, droppedFromMenu} = children;
    const [targetMove, setTargetMove] = useState(false);
    const dispatch = useDispatch();


    const handleTargetMouseMove = useRef((e : any) => {
        const newY = e.clientY - 168;
        handleTargetMove(true, newY);
    });

    const handleTargetSet = useRef ((e: any)=> {
        console.log('target set');
        document.removeEventListener('mousemove', handleTargetMouseMove.current);
        document.removeEventListener('mouseup', handleTargetSet.current);
    });


    const handleMouseEnter = (event : any) => {
        console.log('mouse entered dropped gate')
        if (targetMove) {
            return;
        }

        if (droppedFromMenu) {
            return;
        }

        const gateExtToUpdate = new GateExtClass(x, y, width, height, gateExtension.targetY,
            "", gateExtension.type);
        const gateToUpdate = new DraggableGate(x, y,{x: x, y: y}, width, height, qubitIds, type,
            rotAngle, gateExtToUpdate, droppedFromMenu);
        dispatch(removeDroppedGate(id));
        dispatch(updateDraggingGate(gateToUpdate));
    }

    const handleTargetMove = (move : boolean, newY? : number) => {
        if (newY) {
            setTargetMove(true);
        }
    }

    const handleTargetDragEnd = (newY : number) => {
        setTargetMove(false);
    }

    return (<g className={styles.droppedGate}>
        <GateExtension
            gateId={id}
            droppedFromMenu={droppedFromMenu}
            gateX={x} gateY={y}
            targetY={gateExtension.targetY}
            onTargetMove={handleTargetMove}
            onTargetDragEnd={handleTargetDragEnd}
            type={gateExtension.type}/>
        <Gate x={x} y={y} width={width} height={height} type={type as GateTypes} rotAngle={rotAngle}
              isAttachment={false}
              onMouseEnter={handleMouseEnter}/>

    </g>)
}

export default DroppedGate;
