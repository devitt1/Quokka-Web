import React, { useState } from 'react';
import styles from './CircuitBuilder.module.scss';
import Grid from "./Grid";
interface CircuitArrangementProps {
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {


    return (
            <div className={styles.circuitArrangement}>
                <Grid/>
            </div>
 )

}


export default CircuitArrangement;
