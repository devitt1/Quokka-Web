import React, {useEffect, useRef} from 'react';
import styles from './CircuitBuilder.module.scss';
import GridRow from "./GridRow";
import DraggingGate from "../Gate/DraggingGate/DraggingGate";
import DroppedGates from "../Gate/DroppedGates/DroppedGates";

const Grid : React.FC = () => {
    const rows = Array.from(Array(3).keys());
    const cols = Array.from(Array(35).keys());


    return (
        <svg className={styles.grid} width="100%" height="100%" >
        <pattern id="pattern-checkers" x="0" y="0" width="48" height="39" patternUnits="userSpaceOnUse">
            <rect  x="0" width="40" height="38" y="0" fill="#B5C2D7"
                  opacity="0.1"
            />
            <rect  x="100" width="8" height="40" y="100"
            />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-checkers)"/>
        <GridRow rowVerticalOffset={0} gridCols={cols} rowIndex={0}/>
        <GridRow rowVerticalOffset={39} gridCols={cols} rowIndex={1}/>
        <GridRow rowVerticalOffset={78} gridCols={cols} rowIndex={2}/>
        <DroppedGates/>
        <DraggingGate xOffset={63.765625} yOffset={168} x={0} y={0} width={40} height={38}/>

    </svg>);
}

export default Grid;
