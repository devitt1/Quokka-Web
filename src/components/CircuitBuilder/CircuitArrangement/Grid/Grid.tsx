import React from 'react';
import styles from './Grid.module.scss';
import GridRow from "./GridRow/GridRow";
import DraggingGate from "../../Gate/DraggingGate/DraggingGate";
import DroppedGates from "../../Gate/DroppedGates/DroppedGates";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";

const Grid : React.FC = () => {
    const {circuitState} = useSelector((state : RootState) => (state.circuitConfig));


    const rows = Array.from(Array(circuitState.numQubits).keys());
    const cols = Array.from(Array(30).keys());

    return (
        <svg className={styles.grid}>
        <pattern id="pattern-checkers" x="0" y="0" width="48" height="39" patternUnits="userSpaceOnUse">
            <rect  x="0" width="40" height="38" y="0" fill="#B5C2D7"
                  opacity="0.1"
            />
            <rect  x="100" width="8" height="40" y="100"
            />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-checkers)"/>
        {
            rows.map((gridRow, index) => {
                return <GridRow rowVerticalOffset={39 * gridRow} gridCols={cols} totalRows={rows.length} rowIndex={gridRow}/>
            })
        }
        <DroppedGates/>
        <DraggingGate xOffset={17.765625} yOffset={168} x={0} y={0} width={40} height={38}/>

    </svg>);
}

export default Grid;
