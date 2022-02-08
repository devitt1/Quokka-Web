import React from 'react';
import styles from './BuildOutput.module.scss';
import bin from '../../../assets/bin.svg';

interface BuildOutputProps {
    id : string;
    name : string;
    output : string;
    runDuration : number;
}

const BuildOutput : React.FC<BuildOutputProps> = (children) => {

    const {id, name, output, runDuration} = children;

    const handleViewOutputClicked = () => {

    }

    return (<div className={styles.buildOutput}>
        <p className={styles.buildName}> {name}</p>
        <p className={styles.date}>10/12/2021</p>
        <p className={styles.processingTime}><strong>
            Processing time:
        </strong>{runDuration}</p>
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
