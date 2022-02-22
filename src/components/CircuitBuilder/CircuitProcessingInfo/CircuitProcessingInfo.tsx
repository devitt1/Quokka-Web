import React from 'react';
import styles from './CircuitProcessingInfo.module.scss';

const CircuitProcessingInfo : React.FC = () => {
    return <div className={styles.circuitProcessingInfo}>
        <div className={styles.firstLine}>
            <h4>Circuit builder is currently processing:</h4>
            <p>Estimated time remaining 3:22</p>
            <progress/>
        </div>
        <p>It is not possible to use the cicruit builder whilst processing. Please return once processing is complete to interact with the circuit builder again.</p>

        <h3>Processing: New Untitled Circuit</h3>
    </div>
}

export default CircuitProcessingInfo;
