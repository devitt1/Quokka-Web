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
    findFurthestTopLeftGateInArray,
    getMaxGatesHorizontally,
    locateGatesInSelectionBox
} from "../../../common/helpers";
import {DIMENSIONS} from "../../../common/constants";
import {RootState} from "../../../redux/reducers/rootReducer";
import {
    CompoundGateSelectionContext,
    defaultSelectionBoxValue
} from "../../Providers/CompoundGateSelectionContextProvider";
import {Gate, GateExtension} from "../../../common/classes";
import StackLayout from "../../StackLayout/StackLayout";
import Input from "../../Input/Input";

const SaveCompoundGateModal : React.FC<ModalProps> = (props) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const {droppedGates} = useSelector((state : RootState) => (state.circuitConfig.circuitState));
    const {selectionBox, setSelectionBox} = useContext(CompoundGateSelectionContext);

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleSaveButtonClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        console.log(`setting input value as ${event.target.value}`)
        setInputValue(event.target.value);
    }

    const handleSaveButtonClicked = async () => {
        console.log("save compound gate clicked!")
        console.log("dropped gates currently: ", droppedGates )
        const gatesInSelection = locateGatesInSelectionBox(selectionBox, droppedGates);
        console.log("gates for compound creation: ", gatesInSelection);

        if (gatesInSelection.length === 0){
            return;
        }

        const compoundGatePosition = findFurthestTopLeftGateInArray(gatesInSelection);
        // console.log(`compoundGatePosition : {x = ${compoundGatePosition.x}, y = ${compoundGatePosition.y}}`);
        // console.log((`Max gates horizontally ${getMaxGatesHorizontally(gatesInSelection, droppedGates)}`));
        // console.log((`Max gates vertically ${getMaxGatesVertically(gatesInSelection, droppedGates)}`));

        const qubitSpan = countQubitSpan(gatesInSelection);
        let compoundGateDimension: {width: number, height: number};
        // console.log(qubitSpan);
        if(qubitSpan === 1)
        {
         compoundGateDimension = {width: DIMENSIONS.STD_GATE.WIDTH,
            height : DIMENSIONS.STD_GATE.HEIGHT};
        }
        else{
             compoundGateDimension = {width: DIMENSIONS.STD_GATE.WIDTH,
            height : qubitSpan * DIMENSIONS.STD_GATE.HEIGHT + DIMENSIONS.GRID.PADDING.TOP * (qubitSpan - 1) + DIMENSIONS.STD_GATE.HEIGHT/2};
        }
        dispatch(addDroppedGate(new Gate(compoundGatePosition.x,
            compoundGatePosition.y, compoundGateDimension.width,
            compoundGateDimension.height, [''], 'Compound Gate',
            new GateExtension(0, '', 'None'),
            false, null, inputValue)));
        setSelectionBox((selectionBoxState) => (defaultSelectionBoxValue.selectionBox));
        gatesInSelection.forEach((gate, index) => {
            dispatch(removeDroppedGate(gate.id));
        })

        dispatch(addCompoundGateDropdown(inputValue));
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
