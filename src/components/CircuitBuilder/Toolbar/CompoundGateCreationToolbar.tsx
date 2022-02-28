import React from 'react';
import styles from './Toolbar.module.scss';
import {Button} from "../../Button/Button";
import {useDispatch} from "react-redux";
import {updateCircuitConfigMode} from "../../../redux/actions/circuitConfigAction";
const CompoundGateCreationToolbar : React.FC = () => {
    const dispatch = useDispatch();

    const handleSaveCompoundGateClicked = () => {

    }

    const handleCancelBtnClicked = () => {
        dispatch(updateCircuitConfigMode('NoSelectionMode'));
    }

    const handleInstructionBtnClicked = () => {

    }

    return <div className={styles.toolbar}>
        <div className={styles.fileManager} >
            <h3>Creating New Compound Gate</h3>

        </div>

        <div className={styles.gateDropdowns}>
            <Button name={'Instruction'} types={['circuitBtn', 'circuitInstructionBtn']} onClick={handleInstructionBtnClicked}> Cancel</Button>
            <Button name={'Cancel'} types={['circuitBtn', 'circuitCancelBtn']} onClick={handleCancelBtnClicked}> Cancel</Button>
            <Button name={'Save'} types={['circuitBtn', 'circuitSaveBtn']} onClick={handleSaveCompoundGateClicked}/>
        </div>
    </div>
}

export default CompoundGateCreationToolbar;
