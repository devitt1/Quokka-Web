import React, {useEffect, useState} from 'react';
import styles from './Qubits.module.scss';
import Qubit from "./Qubit/Qubit";
import DraggingGate from "../../Gate/DraggingGate/DraggingGate";
import DroppedGates from "../../Gate/DroppedGates/DroppedGates";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducers/rootReducer";
import AddQubitActionBtn from "./Qubit/AddQubitActionBtn";
import {addQubit, removeQubit} from "../../../../redux/actions/circuitConfigAction";

const Qubits : React.FC = () => {
    const {circuitState} = useSelector((state : RootState) => (state.circuitConfig));
    const [selectedQubitId, setSelectedQubitId] = useState("");
    const dispatch = useDispatch();

    const handleAddQubitActionBtnClicked = () => {
        console.log("Add Qubit clicked");
        dispatch(addQubit());
    }

    const handleQubitSelected = (qubitId : string) => {
        console.log("Qubit selected = ", qubitId);
       setSelectedQubitId(qubitId);
    }

    useEffect( () => {
        const handleDel = async (event : any) => {
            if (event.keyCode === 46) //DELETE KEY
            {
                dispatch(removeQubit(selectedQubitId));

            }
        };
        window.addEventListener('keydown', handleDel);
        return () => {
            window.removeEventListener('keydown', handleDel);
        }
    }, [selectedQubitId]);

    const showGridPattern = () => {
        return  (<>
            <pattern id="pattern-checkers" x="0" y="0" width="48" height="39" patternUnits="userSpaceOnUse">
                <rect x="0" width="40" height="38" y="0" fill="#B5C2D7"
                      opacity="0.1"/>
                <rect x="100" width="8" height="40" y="100"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-checkers)"/>
        </>)
    }

    return (
        <svg className={styles.qubits}>
        {
            circuitState.qubits.map((qubit, index) => {
                return <Qubit key={qubit.id} id={qubit.id} rowVerticalOffset={39 * index} qubitCells={qubit.qubitCells} onQubitSelected={handleQubitSelected} rowIndex={index}/>
            })

        }
        <AddQubitActionBtn x={9} y={circuitState.qubits.length * 39 + 5} onClick={handleAddQubitActionBtnClicked}/>
        <DroppedGates/>
        <DraggingGate xOffset={17.765625} yOffset={168} x={0} y={0} width={40} height={38}/>

    </svg>);
}

export default Qubits;

