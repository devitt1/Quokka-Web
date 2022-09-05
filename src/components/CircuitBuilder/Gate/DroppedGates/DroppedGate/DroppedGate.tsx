import React, {useEffect, useRef, useState} from 'react';
import styles from "./DroppedGate.module.scss";
import Gate from "../../Gate";
import {DraggableGate} from "../../../../../common/classes";
import {GateTypes} from "../../../../../common/types";
import {useDispatch, useSelector} from "react-redux";
import {
    removeDroppedGate,
    updateDraggingGate, updateDroppedGate, updateSelectedGateId,
} from "../../../../../redux/actions/circuitConfigAction";
import {IGate, IGateExtension} from "../../../../../common/interfaces";
import GateExtension from "../../../GateExtension/GateExtension";
import {GateExtension as GateExtClass} from "../../../../../common/classes";
import {RootState} from "../../../../../redux/reducers/rootReducer";


interface DroppedGateProps {
    id: string,
    x: number,
    y: number,
    qubitIds: string[]
    width: number,
    height: number,
    type: GateTypes,
    gateExtension: IGateExtension,
    droppedFromMenu: boolean,
    rotAngle?: string | null;
    name?: string;
    viewOnly?: boolean;
    includedGates? : IGate[];
}

const DroppedGate: React.FC<DroppedGateProps> = (props) => {
    const {
        x,
        y,
        id,
        width,
        height,
        qubitIds,
        type,
        rotAngle,
        gateExtension,
        droppedFromMenu,
        name,
        viewOnly,
        includedGates
    } = props;
    const [targetMove, setTargetMove] = useState(false);
    const {circuitConfigMode} = useSelector((state: RootState) => (state.circuitConfig));
    var droppedGateStyle = [styles.droppedGate];
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();


    const handleTargetMouseMove = useRef((e: any) => {
        const newY = e.clientY - 168;
        handleTargetMove(true, newY);
    });

    const handleTargetSet = useRef((e: any) => {
        document.removeEventListener('mousemove', handleTargetMouseMove.current);
        document.removeEventListener('mouseup', handleTargetSet.current);
    });


    const handleMouseEnter = (event: any) => {
        if (circuitConfigMode === 'NoSelectionMode') {
            return;
        }

        if (viewOnly || targetMove || droppedFromMenu) {
            return;
        }

        const gateExtToUpdate = new GateExtClass(gateExtension.targetY,
            gateExtension.qubitId, gateExtension.type);
        const gateToUpdate = new DraggableGate(
            x,
            y,
            {x: x, y: y},
            width,
            height,
            qubitIds,
            type,
            gateExtToUpdate,
            droppedFromMenu,
            rotAngle,
            name,
            includedGates);
        dispatch(removeDroppedGate(id));
        dispatch(updateDraggingGate(gateToUpdate));
    }

    const handleTargetMove = (move: boolean, newY?: number) => {
        if (newY) {
            setTargetMove(true);
        }
    }

    const toggleGateSelection = () => {
        if (viewOnly) return;
        setSelected(!selected);
    }

    useEffect(() => {
        if (circuitConfigMode === 'GateSelectionMode') return;
        if (selected) {
            dispatch(updateSelectedGateId(id));
        } else {
            dispatch(updateSelectedGateId(""));
        }
    }, [selected]);


    const handleTargetDragEnd = (newY: number) => {
        setTargetMove(false);
    }

    const handleDroppedGateMouseLeft = (event: any) => {
        dispatch(updateDroppedGate(id, 'droppedFromMenu', false));
    }

    return (<g
        className={droppedGateStyle.join(' ')}
        onClick={toggleGateSelection}
        onMouseLeave={handleDroppedGateMouseLeft}>
        <GateExtension
            gateId={id}
            droppedFromMenu={droppedFromMenu}
            gateX={x}
            gateY={y}
            targetY={gateExtension.targetY}
            onTargetMove={handleTargetMove}
            onTargetDragEnd={handleTargetDragEnd}
            type={gateExtension.type}/>
        <Gate
            id={id}
            x={x}
            y={y}
            width={width}
            height={height}
            type={type as GateTypes}
            rotAngle={rotAngle}
            isAttachment={false}
            name={name}
            selected={selected}
            onMouseEnter={handleMouseEnter}/>

    </g>)
}

export default DroppedGate;
