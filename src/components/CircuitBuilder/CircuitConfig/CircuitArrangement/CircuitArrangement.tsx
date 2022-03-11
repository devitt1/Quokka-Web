import React from 'react';
import styles from './CircuitArrangement.module.scss';
import Grid from "./Grid/Grid";
import Canvas from "./Canvas/Canvas";
interface CircuitArrangementProps {
    viewOnlyMode : boolean;
}

const CircuitArrangement : React.FC<CircuitArrangementProps> = (props) => {
    const {viewOnlyMode} = props;
    return (
            <div className={styles.circuitArrangement}>
                <Canvas/>
                <Grid viewOnlyMode={viewOnlyMode}/>
            </div>
    )

}


export default CircuitArrangement;
