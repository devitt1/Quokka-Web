import React, {useState, useEffect} from 'react';
import CircuitArrangement from './CircuitArrangement';
import styles from './CircuitBuilder.module.scss';
import Toolbar from './Toolbar';

const CircuitBuilder : React.FC = () => {


    return (
            <div className={styles.circuitBuilder}>
                <Toolbar/>

                <CircuitArrangement>
                </CircuitArrangement>
                <div className={styles.utilities}>
                    <button >Compress circuit</button>
                    <button> +  | - </button>
                </div>
            </div>
       )
}

export default CircuitBuilder;
