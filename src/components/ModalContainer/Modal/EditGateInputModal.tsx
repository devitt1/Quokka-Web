import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {ModalState} from "../../../common/types";
import {ModalProps} from "./Modal";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch} from "react-redux";
import {updateDroppedGate} from "../../../redux/actions/circuitConfigAction";

const EditGateInputModal : React.FC<ModalProps> = (props) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleOkButtonClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        console.log(`setting input value as ${event.target.value}`)
        setInputValue(event.target.value);
    }

    const handleOkButtonClicked = async () => {
        console.log(`update input value as ${inputValue}`)

        dispatch(updateDroppedGate(props.extras.gateId, 'rotAngle', inputValue));
        dispatch(closeModal(props.id));
    }

    const renderState = (state: ModalState) => {
        switch (state) {
            case 'StartEnterInput':
                return <div className={styles.content}>
                <h1>{props.extras.gateType} Gate - Subroutine params</h1>
                <input
                    type="text"
                    onChange={handleInputChanged}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter here"
                />

                <button onClick={async () => handleOkButtonClicked()}>
                    OK
                </button>
            </div>
            default:
                return <div><h1>Error Opening Modal</h1></div>;

        }
    }

    return <div>
        {renderState(props.state)}
    </div>
}

export default EditGateInputModal;
