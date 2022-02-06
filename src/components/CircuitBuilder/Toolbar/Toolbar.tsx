import React from 'react';
import styles from './Toolbar.module.scss';
import arrow_down from '../../../assets/arrow_down.svg';
import {Dropdown} from "../../Dropdown/Dropdown";
import {Button} from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import {updateGateSelectMode} from "../../../redux/actions/circuitConfigAction";
import {openModal} from "../../../redux/actions/modalsAction";
import {Modal} from "../../../common/classes";
const Toolbar : React.FC = () => {
    const circuitConfig = useSelector((state: RootState) => state.circuitConfig);
    const dispatch = useDispatch();
    const standardGates = ['X', 'Y', 'Z', 'C'];

    const handleSelectBtnClicked = () => {
        dispatch(updateGateSelectMode(!circuitConfig.gateSelectMode));
    }


    const handleRunCircuitBtnClicked = () =>  {
        dispatch(openModal(new Modal('RunCircuitModal', 'StartRunCircuit')));
    }

    return (<div className={styles.toolbar}>
        <div className={styles.fileManager}>
            <h3>Q</h3>
            <img src={arrow_down}/>
            <h3>New Untitled Circuit</h3>
        </div>

        <div className={styles.gateDropdowns}>
            <Button selected={circuitConfig.gateSelectMode} buttonStyle="selectGateBtn" name="Select"
                    onClick={handleSelectBtnClicked}/><Dropdown dropdownContent={standardGates} borderStyle="none"
                                                                name={circuitConfig.selectedStandardGate}/>
            <Dropdown dropdownContent={["compound gate"]} borderStyle="roundedRightCorner"  name="Compound Gate"/>
            <Button selected={true} buttonStyle="runCircuitBtn" name="run" onClick={handleRunCircuitBtnClicked}/>
        </div>
    </div>)
}

export default Toolbar;
