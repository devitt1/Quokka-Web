import React, { useState } from 'react';
import styles from './CircuitBuilder.module.scss';
import Grid from "./Grid";
interface CircuitArrangementProps {
    qubits : {id : string, number : number }[],
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {


    return (
            <div className={styles.circuitArrangement}>
                <Grid></Grid>

            </div>
 )

}


export default CircuitArrangement;
