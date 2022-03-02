import React from 'react';
import styles from './Gate.module.scss';
import {GateTypes} from "../../../common/types";
import {DIMENSIONS} from "../../../common/constants";
import {CNOTGateSymbol, XGateSymbol, YGateSymbol, ZGateSymbol} from "./GateSymbols/GateSymbols";
import GateInput from "./GateInput/GateInput";

interface GateProps {
    id: string;
    x: number;
    y: number;
    width : number;
    height : number;
    type : GateTypes;
    isAttachment : boolean;
    onMouseEnter? : any;
    rotAngle? : string | null;
}

const Gate : React.FC <GateProps> = (props) => {
    const {id, x, y, width, height, type, rotAngle, isAttachment, onMouseEnter} = props;


    const renderGate = (x : number, y : number, width : number, height: number, gateType : GateTypes) => {
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
                    <GateInput gateId={id} gateType={type} rotAngle={rotAngle}/>

                </g>
            case 'RY':
                return <g transform={relativePosition}>
                    <rect width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT} rx="4" fill="url(#paint0_linear_349_5172)"/>
                    <YGateSymbol/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                    <GateInput gateId={id} gateType={type} rotAngle={rotAngle}/>

                </g>
            case 'RZ':
                return <g transform={relativePosition}>
                    <rect width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT} rx="4" fill="url(#paint0_linear_349_5172)"/>
                    <ZGateSymbol/>
                    <defs>
                        <linearGradient id="paint0_linear_349_5172" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1F2E4D"/>
                            <stop offset="1" stopColor="#63718B"/>
                        </linearGradient>
                    </defs>
                    <GateInput gateId={id} gateType={type} rotAngle={rotAngle}/>
                </g>
            case 'CNOT':
                return <g transform={relativePosition}>
                        <rect width="40" height="40" rx="4" fill="url(#paint0_linear_387_5131)"/>
                        <XGateSymbol/>
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
            case 'Measurement Gate':
                return <g transform={relativePosition} fill="none">
                    <rect width="40" height="40" rx="4" fill="url(#paint0_linear_387_4990)"/>
                    <path d="M32 26C32 19.9249 26.8513 15 20.5 15C14.1487 15 9 19.9249 9 26" stroke="white" stroke-width="2"/>
                    <path d="M20 24L32 13" stroke="white" stroke-width="2"/>
                    <defs>
                        <linearGradient id="paint0_linear_387_4990" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#1F2E4D"/>
                            <stop offset="1" stop-color="#63718B"/>
                        </linearGradient>
                    </defs>
                </g>
            case 'Compound Gate 1':
                return <g transform={relativePosition}>
                    <rect width={width} height={height} rx="4" fill="url(#paint0_linear_387_5131)"/>
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
