import React from 'react';
import styles from './CircuitBuilder.module.scss';
import arrow_down from '../../assets/arrow_down.svg';
import {Dropdown} from "../Dropdown/Dropdown";
import {Button} from "../Button/Button";
const Toolbar : React.FC = () => {
    return (<div className={styles.toolbar}>
        <div className={styles.fileManager}>
            <h3>Q</h3>
            <img src={arrow_down}/>
            <h3>New Untitled Cicuit</h3>
        </div>

        <div className={styles.gateDropdowns}>
            <Button buttonStyle="selectGateBtn" name="Select"/>
            <Dropdown borderStyle="none" name="Standard Gate"/>
            <Dropdown borderStyle="roundedRightCorner"  name="Compound Gate"/>
            <Button buttonStyle="runCircuitBtn" name="run"/>
        </div>
    </div>)
}

export default Toolbar;
