import React from 'react';
import styles from './CircuitBuilder.module.scss';
import GridCell from "./GridCell";

interface GridRowProps {
    rowVerticalOffset : number;
    gridCols : number[];
    rowIndex : number;
}

const GridRow : React.FC<GridRowProps> = (children) => {

    const {rowVerticalOffset, gridCols, rowIndex} = children;


    return (<g className={styles.gridRow} y={rowVerticalOffset} width="100%" height="100%" >
            <line className={styles.line} x1="0" y1={rowVerticalOffset + 20} x2="100%"
            y2={rowVerticalOffset + 20}/>
            {
                gridCols.map((number) => {
                    const xPos = number * 48;
                    return (<GridCell key={number} rowIndex={rowIndex} colIndex={number} cellXPos={xPos} cellYPos={rowVerticalOffset} hasGate={false}/>)

                })
            }
        </g>
    )

}

export default GridRow;
