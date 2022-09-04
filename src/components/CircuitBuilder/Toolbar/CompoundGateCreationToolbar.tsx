import React, {useContext} from 'react';
import styles from './Toolbar.module.scss';
import {Button} from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {updateCircuitConfigMode} from "../../../redux/actions/circuitConfigAction";
import {Modal} from "../../../common/classes";
import {openModal} from "../../../redux/actions/modalsAction";
const CompoundGateCreationToolbar : React.FC = () => {
    const dispatch = useDispatch();


    const handleSaveCompoundGateClicked = () => {
        dispatch(openModal(new Modal('SaveCompoundGateModal', 'SaveCompoundGateEntry')));
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
