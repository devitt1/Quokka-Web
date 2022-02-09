import React, {useCallback, useEffect} from 'react';
import styles from './Qubit.module.scss';
import QubitCell from "./QubitCell/QubitCell";
import QubitSymbol from "./QubitSymbol";
import {IQubitCell} from "../../../../../common/interfaces";

interface QubitProps {
    id : string;
    rowVerticalOffset : number;
    qubitCells : IQubitCell[];
    rowIndex : number;
    onQubitSelected : any;
}

const Qubit : React.FC<QubitProps> = (children) => {

    const {id, rowVerticalOffset, rowIndex, onQubitSelected, qubitCells} = children;

    const handleQubitSymbolSelected = () => {
        onQubitSelected(id);
    }


    return (<g className={styles.qubit} y={rowVerticalOffset}  >
            <line x1={48} y1={rowVerticalOffset + 20} x2="100%"
                  y2={rowVerticalOffset + 20}/>
            {
                qubitCells.map((cell, index) => {
                    return <QubitCell key={cell.id} qubitId={id} rowIndex={rowIndex}
                                      colIndex={index} cellXPos={cell.x}
                                      cellYPos={rowVerticalOffset} hasGate={false}/>
                })
            }

            <QubitSymbol x={5} y={rowIndex * 39} onClick={handleQubitSymbolSelected} />

        </g>
    )

}

export default Qubit;
