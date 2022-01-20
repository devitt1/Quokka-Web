import React, {useState, useEffect} from 'react';
import CircuitArrangement from './CircuitArrangement';
import styles from './CircuitBuilder.module.scss';
import Toolbar from './Toolbar';
import CursorContextProvider from "../Providers/CursorContextProvider";
import Cursor from "../Cursor/Cursor";

const initialQubits = [
    {id : "00", number : 1},
    {id : "01", number : 2},
    {id : "02", number : 3},
];

const CircuitBuilder : React.FC = () => {
    const [qubits, setQubits] = useState(initialQubits);



    useEffect(() => {
        console.log(qubits);
    }, [qubits])


    return (
            <div className={styles.circuitBuilder}>
                <Toolbar/>

                <CircuitArrangement qubits={qubits}>
                </CircuitArrangement>
                <div className={styles.utilities}>
                    <button >Compress circuit</button>
                    <button> +  | - </button>
                </div>
            </div>
       )
}

export default CircuitBuilder;
