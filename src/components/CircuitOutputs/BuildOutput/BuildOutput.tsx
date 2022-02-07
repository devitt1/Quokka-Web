import React from 'react';
import styles from './BuildOutput.module.scss';
import bin from '../../../assets/bin.svg';

interface BuildOutputProps {
    id : string;
    name : string;
    output : string;
    runDuration : string;
}

const BuildOutput : React.FC = () => {


    const handleViewOutputClicked = () => {

    }

    return (<div className={styles.buildOutput}>
        <p className={styles.buildName}> Circuit Name</p>
        <p className={styles.date}>10/12/2021</p>
        <p className={styles.processingTime}><strong>
            Processing time:
        </strong>4:00</p>
        <button className={styles.downloadBtn}> Download CSV</button>
        <div className={styles.viewOrDelete}>
            <img src={bin} alt={'bin'}/>
            <button className={styles.viewOutputBtn}
                    onClick={handleViewOutputClicked}>
                View Output
            </button>
        </div>
    </div>)
}

export default BuildOutput;
