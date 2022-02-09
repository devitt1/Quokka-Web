import React from 'react';
import CircuitArrangement from './CircuitArrangement/CircuitArrangement';
import styles from './CircuitBuilder.module.scss';
import Toolbar from './Toolbar/Toolbar';

const CircuitBuilder : React.FC = () => {


    return (
            <div className={styles.circuitBuilder}>
                <Toolbar/>
                <CircuitArrangement/>
                <div className={styles.utilities}>
                    <button >Compress circuit</button>
                    <button> +  | - </button>
                </div>
            </div>
       )
}

export default CircuitBuilder;
