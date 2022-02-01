import React from 'react';
import styles from './GridRow.module.scss';
import GridCell from "./GridCell/GridCell";
import QubitSymbol from "./QubitSymbol";
import AddQubitActionBtn from "./AddQubitActionBtn";
import {useDispatch} from "react-redux";
import {addQubit} from "../../../../../redux/actions/circuitConfigAction";

interface GridRowProps {
    rowVerticalOffset : number;
    totalRows : number;
    gridCols : number[];
    rowIndex : number;
}

const GridRow : React.FC<GridRowProps> = (children) => {

    const {rowVerticalOffset, gridCols, rowIndex, totalRows} = children;
    const dispatch = useDispatch();

    const handleQubitSymbolClicked = () => {
        console.log("QubitSymbol clicked");
    }

    const handleAddQubitActionBtnClicked = () => {
        console.log("Add Qubit clicked");
        dispatch(addQubit());
    }

    return (<g className={styles.gridRow} y={rowVerticalOffset}  >
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
