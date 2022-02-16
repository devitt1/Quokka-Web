import React from 'react';
import styles from './Gate.module.scss';
import {GateTypes} from "../../../common/types";
import {DIMENSIONS} from "../../../common/constants";
import {CNOTGateSymbol, XGateSymbol, YGateSymbol, ZGateSymbol} from "./GateSymbols/GateSymbols";

interface GateProps {
    x: number;
    y: number;
    width : number;
    height : number;
    type : GateTypes;
    rotAngle : string;
    isAttachment : boolean;
    onMouseEnter? : any;
}

const Gate : React.FC <GateProps> = (children) => {
    const {x, y, width, height, type, rotAngle, isAttachment, onMouseEnter} = children;

    const handleTextboxClicked = () => {
        console.log("Text box clicked!");
    }
    const renderGate = (x : number, y : number, width : number, height: number, gateType : string) => {
        const relativePosition = isAttachment ? 'translate(0,0)' : `translate(${x},${y})`;
        switch (gateType) {
            case 'X':
                return <g transform={relativePosition}>
                    <rect
                        width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                        rx="4" fill="url(#paint0_linear_349_5172)"/>
                   <XGateSymbol/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1={0} y1={0} x2={20} y2={40} gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>

            case 'Y':
                return <g transform={relativePosition}>
                    <rect
                        width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                        rx="4" fill="url(#paint0_linear_349_5192)"/>
                    <YGateSymbol/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5192" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>
            case 'Z':
                return <g transform={relativePosition}>
                    <rect
                        width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                        rx="4" fill="url(#paint0_linear_349_5195)"/>
                   <ZGateSymbol/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5195" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>
            case 'RX':
                return <g transform={relativePosition}>
                    <rect width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT} rx="4" fill="url(#paint0_linear_349_5172)"/>
                    <XGateSymbol/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                    <g onClick={handleTextboxClicked} cursor="text">
                        <rect
                            x={DIMENSIONS.GATE_INPUT.WIDTH/2 - DIMENSIONS.GATE_INPUT.MARGIN.LEFT} y={DIMENSIONS.STD_GATE.HEIGHT + DIMENSIONS.GATE_INPUT.MARGIN.TOP}
                            width={DIMENSIONS.GATE_INPUT.WIDTH}
                            height={DIMENSIONS.GATE_INPUT.HEIGHT}
                            fill='transparent' strokeWidth={1} stroke="#C5C5C5" rx="2"/>
                        <text x={DIMENSIONS.GATE_INPUT.WIDTH/2 - DIMENSIONS.GATE_INPUT.PADDING.LEFT}
                              y={DIMENSIONS.STD_GATE.HEIGHT +
                                DIMENSIONS.GATE_INPUT.TEXT.MARGIN.TOP +
                                DIMENSIONS.GATE_INPUT.MARGIN.TOP +
                              DIMENSIONS.GATE_INPUT.PADDING.TOP}
                              fontSize="10" fill="black" textAnchor='start'>{rotAngle}</text>
                    </g>
                </g>
            case 'CNOT':
                return <g transform={relativePosition}>
                        <rect width="40" height="40" rx="4" fill="url(#paint0_linear_387_5131)"/>
                        <CNOTGateSymbol/>
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
            default:
                return 'None'
        }
    }

    return <g className={styles.gate} onMouseEnter={onMouseEnter}>
        {renderGate(x, y, width, height, type)}
    </g>
}

export default Gate;
