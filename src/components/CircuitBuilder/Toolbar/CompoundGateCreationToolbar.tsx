import React, {useContext} from 'react';
import styles from './Toolbar.module.scss';
import {Button} from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {addDroppedGate, removeDroppedGate, updateCircuitConfigMode} from "../../../redux/actions/circuitConfigAction";
import {
    countGatesHorizontally,
    findFurthestTopLeftGateInArray, getMaxGatesHorizontally, getMaxGatesVertically,
    locateGatesInSelectionBox
} from "../../../common/helpers";
import {RootState} from "../../../redux/reducers/rootReducer";
import {CompoundGateSelectionContext} from "../../Providers/CompoundGateSelectionContextProvider";
import {Gate, GateExtension} from "../../../common/classes";
import {DIMENSIONS} from "../../../common/constants";
const CompoundGateCreationToolbar : React.FC = () => {
    const {droppedGates} = useSelector((state : RootState) => (state.circuitConfig.circuitState));
    const {selectionBox, setSelectionBox} = useContext(CompoundGateSelectionContext);

    const dispatch = useDispatch();

    const handleSaveCompoundGateClicked = () => {

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

        const maxGatesHorizontal = getMaxGatesHorizontally(gatesInSelection, droppedGates);
        const maxGatesVertical = getMaxGatesVertically(gatesInSelection, droppedGates);
        const compoundGateDimension = {width : maxGatesHorizontal * DIMENSIONS.STD_GATE.WIDTH,
        height : maxGatesVertical * DIMENSIONS.STD_GATE.HEIGHT + DIMENSIONS.GRID.PADDING.TOP * (maxGatesVertical - 1)};

        dispatch(addDroppedGate(new Gate(compoundGatePosition.x,
            compoundGatePosition.y, compoundGateDimension.width,
            compoundGateDimension.height, [''], 'Compound Gate 1',
            new GateExtension(0, '', 'None'),
            false, null)));

        gatesInSelection.forEach((gate, index) => {
            dispatch(removeDroppedGate(gate.id));
        })

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
