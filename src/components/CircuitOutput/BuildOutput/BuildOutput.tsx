import React from 'react';
import styles from './BuildOutput.module.scss';
import bin from '../../../assets/bin.svg';
import {BrowserRouter, Link, Route} from "react-router-dom";
import BuildOutputView from "../BuildOutputView/BuildOutputView";
import {ROUTES} from "../../../common/constants";

interface BuildOutputProps {
    id : string;
    name : string;
    outputData : number[][];
    runDuration : number;
}

const BuildOutput : React.FC<BuildOutputProps> = (children) => {

    const {id, name, outputData, runDuration} = children;

    const handleViewOutputClicked = () => {
        console.log('View output clicked');
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
            {/*<button className={styles.viewOutputBtn}*/}
            {/*        onClick={handleViewOutputClicked}>*/}
            {/*    View Output*/}
            {/*</button>*/}

            <Link  className={styles.viewOutputBtn}
                   to={`${ROUTES.CIRCUIT_OUTPUT}${ROUTES.BUILD_OUTPUT}/${id}`}
                   state={children}>
                View Output
            </Link>
        </div>

    </div>)
}

export default BuildOutput;
