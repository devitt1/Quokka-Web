import React, {useState, useEffect} from 'react';
import CircuitArrangement from './CircuitArrangement';
import styles from './CircuitBuilder.module.scss';
import { Gates } from './Gates';
import Toolbar from './Toolbar';

const initialQubits = [
    {id : "00", number : 1},
    {id : "01", number : 2},
    {id : "02", number : 3},
];

const CircuitBuilder : React.FC = () => {
    const [qubits, setQubits] = useState(initialQubits);
    const [draggedData, setDragData] = useState(null);



    useEffect(() => {
        console.log(qubits);
    }, [qubits])


    return (
        <div className={styles.circuitBuilder}>
        <Toolbar/>
        <button className={styles.sideButton} onClick={() => {
            setQubits([...qubits,
                {
                    id : "04",
                    number : 4
                }
            ])
        }}>Add Qubit</button>
        <Gates setDragData={(dragData : any) => setDragData(dragData)}/>
        <CircuitArrangement draggedData={draggedData} qubits={qubits}>
        </CircuitArrangement>

        <div className={styles.utilities}>
            <button>Compress circuit</button>
            <button>Zoom in/Zoom out</button>
        </div>

    </div>)
}

export default CircuitBuilder;
