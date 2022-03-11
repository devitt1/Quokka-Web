import React, {useCallback, useEffect, useState} from 'react';
import styles from './Qubit.module.scss';
import QubitCell from "./QubitCell/QubitCell";
import QubitSymbol from "./QubitSymbol";
import {IQubitCell} from "../../../../../../common/interfaces";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../redux/reducers/rootReducer";
import {DIMENSIONS} from "../../../../../../common/constants";
import {updateQubitInArray} from "../../../../../../redux/reducers/circuitConfigReducer";
import {updateQubit} from "../../../../../../redux/actions/circuitConfigAction";

interface QubitProps {
    id : string;
    rowVerticalOffset : number;
    qubitCells : IQubitCell[];
    rowIndex : number;
    onQubitSelected : any;
}

const Qubit : React.FC<QubitProps> = (props) => {
    const {id, rowVerticalOffset, rowIndex, onQubitSelected, qubitCells} = props;
    const {selectedQubitId} = useSelector((state: RootState) => (state.circuitConfig));
    const dispatch = useDispatch();

    const handleQubitSymbolSelected = () => {
        onQubitSelected(id);
    }

    useEffect(() => {
        dispatch(updateQubit(id, 'y', rowVerticalOffset + 20));
    }, [])

    return (<g className={styles.qubit} y={rowVerticalOffset}  >
            <line x1={48} y1={rowVerticalOffset + 20} x2={48 * qubitCells.length}
                  y2={rowVerticalOffset + 20}/>
            {
                qubitCells.map((cell, index) => {
                    return <QubitCell key={cell.id} qubitId={id} rowIndex={rowIndex}
                                      colIndex={index} cellXPos={cell.x}
                                      cellYPos={rowVerticalOffset} hasGate={false}/>
                })
            }
            <QubitSymbol isSelected={id === selectedQubitId} x={5} y={rowIndex * 64 + 21} onClick={handleQubitSymbolSelected} />


        </g>
    )

}

export default Qubit;
