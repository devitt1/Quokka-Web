import React from 'react';
import styles from './CircuitArrangement.module.scss';
import Grid from "./Grid/Grid";
import Canvas from "./Canvas/Canvas";
interface CircuitArrangementProps {
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {


    return (
            <div className={styles.circuitArrangement}>
                <Canvas/>
                <Grid/>
            </div>
 )

}


export default CircuitArrangement;
