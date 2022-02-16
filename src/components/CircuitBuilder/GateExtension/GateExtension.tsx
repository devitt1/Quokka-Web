import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './GateExtension.module.scss'
import {DIMENSIONS} from "../../../common/constants";
import {GateExtTypes} from "../../../common/types";
import {IGateExtension} from "../../../common/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import {updateDroppedGate, updateDroppedGateExtension} from "../../../redux/actions/circuitConfigAction";

interface GateExtensionProps {
    gateId : string;
    droppedFromMenu : boolean;
    gateX : number;
    gateY : number;
    targetY : number;
    onTargetMove? : any;
    onTargetDragEnd : any;
    type : GateExtTypes;
}

export const GateExtension: React.FC<GateExtensionProps>= (props) => {

    const gateExtRef : any = useRef(null);
    const {gateX, gateY, targetY, onTargetMove, onTargetDragEnd, type, gateId, droppedFromMenu} = props;
    const relativePos = `translate(0,0)`
    const dispatch = useDispatch();

    useEffect(() => {
        if (droppedFromMenu) {
            document.addEventListener('mousemove', handleTargetMouseMove.current);
        }
        return () => {

        }

    }, [])
    const handleTargetMouseDown = () => {
        document.addEventListener('mousemove', handleTargetMouseMove.current);
    }

    const handleTargetMouseMove = useRef((e : any) => {
        const newY = e.clientY - 168;
        onTargetMove(true, newY);
        console.log('update gate ', gateId)
        dispatch(updateDroppedGateExtension(gateId, 'targetY', newY))

    });

    const handleTargetMouseUp = (e : any) => {
        document.removeEventListener('mousemove', handleTargetMouseMove.current);
        const newY = Math.floor(e.clientY / 64) * 64 - 168 + DIMENSIONS.STD_GATE.HEIGHT/2;
        dispatch(updateDroppedGateExtension(gateId, 'targetY', newY))
        dispatch(updateDroppedGate(gateId, 'droppedFromMenu', false));
        onTargetMove(false);
        onTargetDragEnd(newY);
    }

    const renderGateExt = (type : GateExtTypes) => {
        if (type === 'CNOT_TARGET') {
            return <g
                className={styles.gateExtension}
                transform={relativePos}
                ref={gateExtRef}>

                <line
                    className={styles.innerStroke}
                    stroke="#5E6C87"  strokeWidth="4"
                    x1={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    x2={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    y1={gateY + DIMENSIONS.STD_GATE.HEIGHT/2}
                    y2={targetY}>
                </line>
                <circle
                    className={styles.target}
                    onMouseDown={handleTargetMouseDown}
                    onMouseUp={handleTargetMouseUp}
                    cx={gateX + DIMENSIONS.STD_GATE.WIDTH/2}
                    cy={targetY} r="13" fill="url(#paint0_linear_387_5131)"/>
                <defs>
                    <linearGradient id="paint0_linear_387_5131" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1F2E4D"/>
                        <stop offset="1" stopColor="#63718B"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_387_5131" x1="20" y1="57" x2="20" y2="83" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1F2E4D"/>
                        <stop offset="1" stopColor="#63718B"/>
                    </linearGradient>
                </defs>
            </g>
        } else {
            return null;
        }
    }

    return renderGateExt(type);
}

export default GateExtension;
