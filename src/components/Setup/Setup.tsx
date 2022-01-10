import React from 'react';
import styles from './Setup.module.scss';

const Setup : React.FC = () => {
    return (<div className={styles.setup}>
        <p>Instructions/informational page for how to connect the mobile to Quokka & also Quokka to the circuit builder</p>
        <p>Cater for standard text and images. This page needs to work on all devices.</p>
    </div>)
}

export default Setup;
