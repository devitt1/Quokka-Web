import React, {useState} from 'react';
import {ModalProps} from "./Modal";
import styles from './Modal.module.scss';
import {ModalState} from "../../../common/types";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch} from "react-redux";
import {Button} from "../../Button/Button";

const SaveCircuitModal : React.FC<ModalProps> = (props) => {
    const [modalState, setModalState] = useState(props.state);
    const dispatch = useDispatch();


    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleSaveButtonClicked();
        }
    }

    const handleInputChanged = (event : any) => {

    }

    const handleSaveButtonClicked = async () => {

    }

    const handleBackButtonClicked = async () => {
        dispatch(closeModal(props.id));
    }

    const renderState = (state : ModalState) => {
        switch (state) {
            case 'SaveCircuitNameEntry':
                return(<div className={styles.content}>
                    <h3>Save File</h3>
                    <input
                        type="text"
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter name"
                    />
                    <div className={styles.buttonGroup}>
                        <Button name='Back'
                                types={['standardBtn']}
                                onClick={async () => handleBackButtonClicked()}>
                        </Button>
                        <Button name='Save'
                                types={['standardBtn']}
                                onClick={async () => handleSaveButtonClicked()}>
                        </Button>
                    </div>
                </div>)
            default:
                return <div><h1>Error Opening Modal</h1></div>;
        }
    }
    return <div>{
        renderState(modalState)
    }
    </div>
}

export default SaveCircuitModal;
