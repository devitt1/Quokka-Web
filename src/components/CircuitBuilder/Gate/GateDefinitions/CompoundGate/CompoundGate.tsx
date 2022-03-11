import React from 'react';
import styles from './CompoundGate.module.scss';
import AdaptiveTextBox from "../../../../AdaptiveTextbox/AdaptiveTextBox";

interface CompoundGateProps {
    width : number;
    height : number;
    name: string | undefined;
}
const CompoundGate : React.FC<CompoundGateProps> = (props) => {
    const {width, height, name} = props;
    var gateName = "UNDEFINED";
    if (name) {
        gateName = name;
    }
    return <g className={styles.compoundGate}>
        <rect className={styles.rectBkg} width={width} height={height} rx="4"/>
        <AdaptiveTextBox text={gateName} width={width} height={height}/>
        <defs>
            <linearGradient id="gateBkg" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1F2E4D"/>
                <stop offset="1" stopColor="#63718B"/>
            </linearGradient>
        </defs>
    </g>
}

export default CompoundGate;
