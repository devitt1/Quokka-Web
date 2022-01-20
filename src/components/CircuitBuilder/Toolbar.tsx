import React, {useContext, useState} from 'react';
import styles from './CircuitBuilder.module.scss';
import arrow_down from '../../assets/arrow_down.svg';
import {Dropdown} from "../Dropdown/Dropdown";
import {Button} from "../Button/Button";
import {CursorContext} from "../Providers/CursorContextProvider";
const Toolbar : React.FC = () => {

    const {cursor, setCursor} = useContext(CursorContext);
    const [selected, setSelected] = useState(false);

    const standardGates = ['X', 'Y', 'Z', 'C'];

    const handleSelectBtnClicked = () => {
        console.log("select btn clicked!");
        setCursor(({active}) => ({active : !active}));
        setSelected(true);
    }


    const handleRunCircuitBtnClicked = () =>  {
        console.log("run btn clicked!");
    }

    return (<div className={styles.toolbar}>
        <div className={styles.fileManager}>
            <h3>Q</h3>
            <img src={arrow_down}/>
            <h3>New Untitled Cicuit</h3>
        </div>

        <div className={styles.gateDropdowns}>
            <Button selected={selected} buttonStyle="selectGateBtn" name="Select" onClick={handleSelectBtnClicked}/>
            <Dropdown dropdownContent={standardGates} borderStyle="none" name="Standard Gate"/>
            <Dropdown dropdownContent={["compound gate"]} borderStyle="roundedRightCorner"  name="Compound Gate"/>
            <Button selected={selected} buttonStyle="runCircuitBtn" name="run" onClick={handleRunCircuitBtnClicked}/>
        </div>
    </div>)
}

export default Toolbar;
