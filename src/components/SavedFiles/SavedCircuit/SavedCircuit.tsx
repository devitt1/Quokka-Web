import React from 'react';
import styles from './SavedCircuit.module.scss';
import bin from "../../../assets/bin.svg";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../common/constants";

interface SavedCircuitProps {
    id : string;
    name : string;
    circuitArrangement : string;
}

const SavedCircuit : React.FC<SavedCircuitProps> = (props) => {

    const {id, name, circuitArrangement, children} = props;

    return <div className={styles.savedCircuit}>
        <p className={styles.circuitName}> {name}</p>
        <p className={styles.date}>10/12/2021</p>
        <div className={styles.viewOrDelete}>
            <img src={bin} alt={'bin'}/>
            {/*<button className={styles.viewOutputBtn}*/}
            {/*        onClick={handleViewOutputClicked}>*/}
            {/*    View Output*/}
            {/*</button>*/}

            <Link  className={styles.viewOutputBtn}
                   to={`${ROUTES.CIRCUIT_BUILDER}/${id}`}
                   state={children}>
                Open
            </Link>
        </div>
    </div>
}

export default SavedCircuit;
