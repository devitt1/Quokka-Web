import React, {useEffect, useRef, useState} from 'react';
import styles from "./DroppedGate.module.scss";
import Gate from "../../Gate";
import {DraggableGate, Gate as GateClass} from "../../../../../common/classes";
import {GateTypes} from "../../../../../common/types";
import {useDispatch, useSelector} from "react-redux";
import {
    removeDroppedGate,
    updateDraggingGate, updateDroppedGate, updateDroppedGateExtension
} from "../../../../../redux/actions/circuitConfigAction";
import {IGateExtension} from "../../../../../common/interfaces";
import GateExtension from "../../../GateExtension/GateExtension";
import {GateExtension as GateExtClass} from "../../../../../common/classes";
import {RootState} from "../../../../../redux/reducers/rootReducer";


interface DroppedGateProps {
    id: string,
    x: number,
    y: number,
    qubitIds: string[]
    width : number,
    height : number,
    type : GateTypes,
    gateExtension : IGateExtension,
    droppedFromMenu: boolean,
    rotAngle? : string | null
}

const DroppedGate : React.FC<DroppedGateProps> = (children) => {
    const {x, y, id, width, height, qubitIds, type, rotAngle, gateExtension, droppedFromMenu} = children;
    const [targetMove, setTargetMove] = useState(false);
    const {selectedGateId} = useSelector((state : RootState) => (state.circuitConfig));
    var droppedGateStyle = styles.droppedGate;
    if (selectedGateId === id) {
        droppedGateStyle = styles.droppedGate + " " + styles.selected;
    }
    const dispatch = useDispatch();


    const handleTargetMouseMove = useRef((e : any) => {
        const newY = e.clientY - 168;
        handleTargetMove(true, newY);
    });

    const handleTargetSet = useRef ((e: any)=> {
        document.removeEventListener('mousemove', handleTargetMouseMove.current);
        document.removeEventListener('mouseup', handleTargetSet.current);
    });


    const handleMouseEnter = (event : any) => {
        if (targetMove) {
            return;
        }

        if (droppedFromMenu) {
            return;
        }

        const gateExtToUpdate = new GateExtClass(gateExtension.targetY,
            gateExtension.qubitId, gateExtension.type);
        const gateToUpdate = new DraggableGate(x, y,{x: x, y: y}, width, height, qubitIds, type,
            gateExtToUpdate, droppedFromMenu, rotAngle);
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

    const handleDroppedGateMouseLeft = (event : any) => {
        dispatch(updateDroppedGate(id, 'droppedFromMenu', false));
    }

    return (<g className={droppedGateStyle} onMouseLeave={handleDroppedGateMouseLeft}>
        <GateExtension
            gateId={id}
            droppedFromMenu={droppedFromMenu}
            gateX={x} gateY={y}
            targetY={gateExtension.targetY}
            onTargetMove={handleTargetMove}
            onTargetDragEnd={handleTargetDragEnd}
            type={gateExtension.type}/>
        <Gate
            id={id}
            x={x} y={y} width={width} height={height}
            type={type as GateTypes} rotAngle={rotAngle}
            isAttachment={false}
            onMouseEnter={handleMouseEnter}/>

    </g>)
}

export default DroppedGate;
