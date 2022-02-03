import React from 'react';
import styles from './CircuitArrangement.module.scss';
import Qubits from "./Qubits/Qubits";
import Canvas from "./Canvas/Canvas";
interface CircuitArrangementProps {
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {


    return (
            <div className={styles.circuitArrangement}>
                <Canvas/>
                <Qubits/>
            </div>
 )

}


export default CircuitArrangement;
