import React from 'react';
import styles from './CircuitOutputs.module.scss';
import CircuitOutput from "./CircuitOutput/CircuitOutput";

const CircuitOutputs : React.FC = () => {

    var empty = false;

    const CircuitOutputItemArray = [

    ]

    return (<div className={styles.circuitOutputs}>
        <h2>Circuit Output</h2>


        {
            !empty ?
                <CircuitOutput/>
                :
                <div className={styles.prompt}>
                    <p>Run a circuit in the Circuit Builder and visit this page again once complete to see the output.</p>
                    <p className={styles.warningMessage}>Circuit output will only be accessible until cookies are cleared. Login or create an account to save circuit output.</p>
                </div>
        }


    </div>)
}

export default CircuitOutputs;
