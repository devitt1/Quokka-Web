import React from 'react';
import styles from './Gate.module.scss';
import {GateTypes} from "../../../common/types";
import {DIMENSIONS} from "../../../common/constants";
import {CNOTGateSymbol, HGateSymbol, XGateSymbol, YGateSymbol, ZGateSymbol} from "./GateSymbols/GateSymbols";
import GateInput from "./GateInput/GateInput";
import CompoundGate from "./GateDefinitions/CompoundGate/CompoundGate";

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
    name? : string;
    selected? : boolean;
}

const Gate : React.FC <GateProps> = (props) => {
    const {id, x, y, width, height, type, rotAngle, isAttachment, onMouseEnter, name
    , selected} = props;

    const gateBackground = () => {
        return  (
            <>
                <rect
                    width={DIMENSIONS.STD_GATE.WIDTH} height={DIMENSIONS.STD_GATE.HEIGHT}
                    rx="4"
                    fill="url(#paint0_linear_349_5172)"
                    stroke="#5C7DFF"
                    strokeWidth={selected ? "4" : "0"}
                />
                <defs>
                    <linearGradient id="paint0_linear_349_5172" x1={0} y1={0} x2={20} y2={40} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#1F2E4D"/>
                        <stop offset="1" stopColor="#63718B"/>
                    </linearGradient>
                </defs>
            </>
        )
    }


    const renderGate = (x : number, y : number, width : number, height: number, gateType : GateTypes) => {
        const relativePosition = isAttachment ? 'translate(0,0)' : `translate(${x},${y})`;
        switch (gateType) {
            case 'X':
                return <g transform={relativePosition}>
                    {gateBackground()}
                   <XGateSymbol/>

                </g>

            case 'Y':
                return <g transform={relativePosition}>
                    {gateBackground()}
                    <YGateSymbol/>

                </g>
            case 'Z':
                return <g transform={relativePosition}>
                    {gateBackground()}
                   <ZGateSymbol/>
                </g>
            case 'RX':
                return <g transform={relativePosition}>
                    {gateBackground()}
                    <XGateSymbol/>
                    <GateInput gateId={id} gateType={type} rotAngle={rotAngle}/>
                </g>
            case 'RY':
                return <g transform={relativePosition}>
                    {gateBackground()}
                    <YGateSymbol/>
                    <GateInput gateId={id} gateType={type} rotAngle={rotAngle}/>
                </g>
            case 'RZ':
                return <g transform={relativePosition}>
                    {gateBackground()}
                    <ZGateSymbol/>
                    <GateInput gateId={id} gateType={type} rotAngle={rotAngle}/>
                </g>
            case 'H':
                return <g transform={relativePosition}>
                    {gateBackground()}
                    <HGateSymbol/>
                </g>
            case 'CNOT':
                return <g transform={relativePosition}>
                        {gateBackground()}
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
                    {gateBackground()}
                    <path d="M32 26C32 19.9249 26.8513 15 20.5 15C14.1487 15 9 19.9249 9 26" stroke="white" stroke-width="2"/>
                    <path d="M20 24L32 13" stroke="white" stroke-width="2"/>

                </g>
            case 'Compound Gate':
                return <g transform={relativePosition}>
                    <CompoundGate width={width} height={height} name={name}/>
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
