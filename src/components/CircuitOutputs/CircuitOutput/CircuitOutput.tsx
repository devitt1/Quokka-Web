import React from 'react';
import styles from './CircuitOutput.module.scss';
import bin from '../../../assets/bin.svg';
const CircuitOutput : React.FC = () => {
    return (<div className={styles.circuitOutput}>
        <p className={styles.circuitName}> Circuit Name</p>
        <p className={styles.date}>10/12/2021</p>
        <p className={styles.processingTime}><strong>
            Processing time:
        </strong>4:00</p>
        <button className={styles.downloadBtn}> Download CSV</button>
        <div className={styles.viewOrDelete}>
            <img src={bin} alt={'bin'}/>
            <button className={styles.viewOutputBtn}>
                View Output</button>
        </div>
    </div>)
}

export default CircuitOutput;
