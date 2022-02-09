import React, {useEffect} from 'react';
import styles from './BuildOutputView.module.scss';
import {useLocation} from "react-router-dom";
import {IBuildOutput} from "../../../common/interfaces";
import Accordion from "../../Accordion/Accordion";
import BuildOutputChart from "./BuildOutputChart/BuildOutputChart";

interface BuildOutputViewProps {
}



const BuildOutputView : React.FC<BuildOutputViewProps> = (children) => {
    const location = useLocation();
    const buildOutput = location.state as IBuildOutput;

    return <div className={styles.buildOutputView} >
        <div className={styles.outputHeader}>
            <h2 className={styles.outputName}>{buildOutput.name}</h2>
            <div className={styles.metaDataAndDownload}>
                <p>10/12/21</p>
                <p className={styles.buildDuration} >Processing time: 4:00</p>
                <button className={styles.downloadCSVButton}>Download CSV</button>
            </div>
        </div>
        <Accordion title={'View Circuit Arrangement'}>
            <p>This is circuit arrangement</p>
        </Accordion>
        <BuildOutputChart/>
    </div>
}

export default BuildOutputView;
