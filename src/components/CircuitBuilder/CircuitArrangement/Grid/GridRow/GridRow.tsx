import React from 'react';
import styles from './GridRow.module.scss';
import GridCell from "./GridCell/GridCell";
import QubitSymbol from "./QubitSymbol";
import AddQubitActionBtn from "./AddQubitActionBtn";

interface GridRowProps {
    rowVerticalOffset : number;
    totalRows : number;
    gridCols : number[];
    rowIndex : number;
}

const GridRow : React.FC<GridRowProps> = (children) => {

    const {rowVerticalOffset, gridCols, rowIndex, totalRows} = children;

    const handleQubitSymbolClicked = () => {
        console.log("QubitSymbol clicked");
    }

    const handleAddQubitActionBtnClicked = () => {
        console.log("Add Qubit clicked");
    }

    return (<g className={styles.gridRow} y={rowVerticalOffset} width="100%" height="100%" >
            <line x1={48} y1={rowVerticalOffset + 20} x2="100%"
                  y2={rowVerticalOffset + 20}/>
            {
                gridCols.map((number) => {
                    const xPos = number * 48;
                    return (<GridCell key={number} rowIndex={rowIndex} colIndex={number} cellXPos={xPos} cellYPos={rowVerticalOffset} hasGate={false}/>)

                })
            }
            {
                (totalRows - 1) === rowIndex ?
                    <AddQubitActionBtn x={9} y={rowIndex * 39 + 5} onClick={handleAddQubitActionBtnClicked}/>
                    :
                    <QubitSymbol x={5} y={rowIndex * 39} onClick={handleQubitSymbolClicked}/>

            }
        </g>
    )

}

export default GridRow;
