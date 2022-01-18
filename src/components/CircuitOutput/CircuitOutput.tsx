import React from 'react';
import styles from './CircuitOutput.module.scss';
import CircuitOutputItem from "./CircuitOutputItem";

const CircuitOutput : React.FC = () => {

    var empty = false;

    const CircuitOutputItemArray = [

    ]

    return (<div className={styles.circuitOutput}>
        <h2>Circuit Output</h2>


        {
            !empty ?
                <CircuitOutputItem/>
                :
                <div className={styles.prompt}>
                    <p>Run a circuit in the Circuit Builder and visit this page again once complete to see the output.</p>
                    <p className={styles.warningMessage}>Circuit output will only be accessible until cookies are cleared. Login or create an account to save circuit output.</p>
                </div>
        }


    </div>)
}

export default CircuitOutput;
