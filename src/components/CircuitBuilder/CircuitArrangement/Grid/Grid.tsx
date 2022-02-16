import React, {useEffect, useRef, useState} from 'react';
import styles from './Grid.module.scss';
import Qubit from "./Qubit/Qubit";
import DraggingGate from "../../Gate/DraggingGate/DraggingGate";
import DroppedGates from "../../Gate/DroppedGates/DroppedGates";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import AddQubitActionBtn from "./Qubit/AddQubitActionBtn";
import {addQubit, removeQubit} from "../../../../redux/actions/circuitConfigAction";
import {DIMENSIONS} from "../../../../common/constants";
import {sleep} from "../../../../common/helpers";
import GateExtension from "../../GateExtension/GateExtension";





const Grid : React.FC = () => {
    const {circuitState} = useSelector((state : RootState) => (state.circuitConfig));
    const [selectedQubitId, setSelectedQubitId] = useState("");
    const gridRef : any = useRef(null);
    const [gridPosition, setGridPosition] = useState({
        x : 0,
        y : 168
    })
    const dispatch = useDispatch();

    const handleAddQubitActionBtnClicked = () => {
        dispatch(addQubit());
    }

    const handleQubitSelected = (qubitId : string) => {
       setSelectedQubitId(qubitId);
    }

    useEffect( () => {
        const handleQubitDeleted = async (event : any) => {
            if (event.keyCode === 46) //DELETE KEY
            {
                dispatch(removeQubit(selectedQubitId));
            }
        };
        window.addEventListener('keydown', handleQubitDeleted);
        return () => {
            window.removeEventListener('keydown', handleQubitDeleted);
        }
    }, [selectedQubitId]);

    const showGridPattern = () => {
        return  (<>
            <pattern id="grid-pattern" x="0" y="0"
                     width={DIMENSIONS.GRID.WIDTH}
                     height={DIMENSIONS.GRID.HEIGHT}
                     patternUnits="userSpaceOnUse">
                <rect x="0" y={DIMENSIONS.GRID.PADDING.TOP}
                      width={DIMENSIONS.STD_GATE.WIDTH}
                      height={DIMENSIONS.STD_GATE.HEIGHT}
                      fill="#B5C2D7"
                      opacity="0.1"/>
                <rect x="0" y="0"
                      width={DIMENSIONS.GRID.WIDTH}
                      height={DIMENSIONS.GRID.HEIGHT}
                      stroke="#B5C2D7" fill="transparent"
                      opacity="1"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)"/>
        </>)
    }

    return (
        <svg className={styles.grid} ref={gridRef}>
            {showGridPattern()}
        {
            circuitState.qubits.map((qubit, index) => {

                return <Qubit key={qubit.id} id={qubit.id}
                              rowVerticalOffset={DIMENSIONS.GRID.HEIGHT * index + DIMENSIONS.GRID.PADDING.TOP}
                              qubitCells={qubit.qubitCells}
                              onQubitSelected={handleQubitSelected}
                              rowIndex={index}/>
            })

        }
        <AddQubitActionBtn x={DIMENSIONS.ADD_QUBIT_BTN.X_OFFSET}
           y={circuitState.qubits.length * DIMENSIONS.GRID.HEIGHT
           + DIMENSIONS.ADD_QUBIT_BTN.Y_OFFSET + DIMENSIONS.GRID.PADDING.TOP }
           onClick={handleAddQubitActionBtnClicked}/>
        {/*<GateExtension*/}
        {/*    xOffset={gridPosition.x}*/}
        {/*    yOffset={gridPosition.y}*/}
        {/*/>*/}
        <DroppedGates/>

        <DraggingGate
            xOffset={gridPosition.x}
            yOffset={gridPosition.y} x={0} y={0} width={40} height={38}/>

    </svg>);
}

export default Grid;

