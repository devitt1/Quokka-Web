import React, {useContext, useState} from 'react';
import styles from './Modal.module.scss';
import {ModalProps} from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {
    addCompoundGateDropdown,
    addDroppedGate,
    removeDroppedGate,
    updateCircuitConfigMode,
    updateDroppedGate
} from "../../../redux/actions/circuitConfigAction";
import {closeModal} from "../../../redux/actions/modalsAction";
import {ModalState} from "../../../common/types";
import {Button} from "../../Button/Button";
import {
    countQubitSpan,
    getMaxGatesHorizontally,
    locateGatesInSelectionBox
} from "../../../common/helpers";
import {DIMENSIONS} from "../../../common/constants";
import {RootState} from "../../../redux/reducers/rootReducer";
import {
    CompoundGateSelectionContext,
    defaultSelectionBoxValue
} from "../../Providers/CompoundGateSelectionContextProvider";
import StackLayout from "../../StackLayout/StackLayout";
import Input from "../../Input/Input";
import {renderCompoundGate} from "../../../utils/gate-renderer";

const SaveCompoundGateModal: React.FC<ModalProps> = (props) => {
    const dispatch = useDispatch();
    const [gateName, setGateName] = useState("");
    const {droppedGates} = useSelector((state: RootState) => (state.circuitConfig.circuitState));
    const {selectionBox, setSelectionBox} = useContext(CompoundGateSelectionContext);

    const handleKeyDown = async (event: any) => {
        if (event.key === 'Enter') {
            await handleSaveButtonClicked();
        }
    }

    const handleInputChanged = (event: any) => {
        setGateName(event.target.value);
    }

    const handleSaveButtonClicked = async () => {
        const gatesInSelection = locateGatesInSelectionBox(selectionBox, droppedGates);
        if (gatesInSelection.length === 0) {
            return;
        }

        const newCompoundGate = renderCompoundGate(droppedGates, gateName);
        dispatch(addDroppedGate(newCompoundGate));

        gatesInSelection.forEach((gate, index) => {
            dispatch(removeDroppedGate(gate.id));
        })

        setSelectionBox((selectionBoxState) => (defaultSelectionBoxValue.selectionBox));

        dispatch(addCompoundGateDropdown(gateName));
        dispatch(updateCircuitConfigMode('NoSelectionMode'));
        dispatch(closeModal(props.id));
    }

    const handleBackButtonClicked = async () => {
        dispatch(closeModal(props.id));
    }

    const renderState = (state: ModalState) => {
        switch (state) {
            case 'SaveCompoundGateEntry':
                return <StackLayout orientation="vertical">
                    <h1>Edit Compound Gate Name</h1>
                    <Input
                        styleTypes={["default"]}
                        type="text"
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Name"
                    />

                    <StackLayout orientation="horizontal">
                        <Button name='Back'
                                types={['standardBtn']}
                                onClick={async () => handleBackButtonClicked()}>
                        </Button>
                        <Button name='Save'
                                types={['standardBtn']}
                                onClick={async () => handleSaveButtonClicked()}>
                        </Button>
                    </StackLayout>
                </StackLayout>
            default:
                return <div><h1>Error Opening Modal</h1></div>;

        }
    }

    return <div>
        {renderState(props.state)}
    </div>
}

export default SaveCompoundGateModal;
