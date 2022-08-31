import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './Toolbar.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import {
    updateCircuitConfigMode,
    updateCircuitConfigTitle,
    updateSelectedStandardGate
} from "../../../redux/actions/circuitConfigAction";
import {openModal} from "../../../redux/actions/modalsAction";
import {Modal} from "../../../common/classes";
import {ALL_STD_GATES} from "../../../common/types";
import DropdownButton from "../../DropdownButton/DropdownButton";
import arrow_down from "../../../assets/arrow_down.svg";
import {Dropdown} from "../../Dropdown/Dropdown";
import DropdownList from "../../Dropdown/DropdownList/DropdownList";
import {Button} from "../../Button/Button";
import arrow_down_black from "../../../assets/arrow_down_black.svg";
import {CursorContext} from "../../Providers/CursorContextProvider";

const NewCircuitToolbar : React.FC = () => {
    const {circuitConfigTitle, circuitConfigMode, selectedStandardGate, compoundGates} = useSelector((state: RootState) => state.circuitConfig);

    const dispatch = useDispatch();
    const [editCircuitDisabled, setEditCircuitDisabled] = useState(true);
    const handleSelectBtnClicked = () => {
        if (circuitConfigMode === 'GateSelectionMode') {
            dispatch(updateCircuitConfigMode('NoSelectionMode'));
        } else if (circuitConfigMode === 'NoSelectionMode') {
            dispatch(updateCircuitConfigMode('GateSelectionMode'));
        }
    }

    const handleRunCircuitBtnClicked = () =>  {
        dispatch(openModal(new Modal('RunCircuitModal', 'StartRunCircuit')));
    }

    const handleDropdownItemClicked = (dropdownItem: string) => {
        if (dropdownItem === 'Save') {
            dispatch(openModal(new Modal('SaveCircuitModal', 'SaveCircuitNameEntry')));
        } else if (dropdownItem === 'Load') {
            dispatch(updateCircuitConfigMode('LoadFilesMode'));
        }
    }

    const handleCircuitTitleInputChanged = (event : any) => {
        dispatch((updateCircuitConfigTitle(event.target.value)));
    }

    const handleCircuitTitleClicked = (event : any) => {
        setEditCircuitDisabled(false);
    }

    const handleCircuitTitleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            setEditCircuitDisabled(true);
        }
    }

    const handleStandardGateDropdownItemClicked = (dropdownItem : string) => {
        dispatch(updateSelectedStandardGate(dropdownItem));
    }

    const handleCompoundGateDropdownItemClicked = (dropdownItem : string) => {
        if (dropdownItem === '+ Create New') {
            console.log('change to compound gate creation mode');
            dispatch(updateCircuitConfigMode('CompoundGateCreationMode'));
        }
    }



    return (<div className={styles.toolbar}
    >
        <div className={styles.fileManager} >
            <h3>Q</h3>
            <DropdownButton name={''} buttonTypes={['imageBtn']} imageButtonDropdownSource={arrow_down}>
                <Dropdown>
                    <DropdownList list={['New', 'Load', 'Save', 'Save as']} onDropdownItemClicked={handleDropdownItemClicked}/>
                </Dropdown>
            </DropdownButton>
            <input type="text"
                   style={editCircuitDisabled ? {cursor: "default"} : {cursor: 'text'}}
                   value={circuitConfigTitle}
                   readOnly={editCircuitDisabled}
                   className={styles.circuitEditableTitle}
                   onChange={handleCircuitTitleInputChanged}
                   onDoubleClick={handleCircuitTitleClicked}
                   onKeyDown={handleCircuitTitleKeyDown}
            />
        </div>

        <div className={styles.gateDropdowns}>
            <Button selected={circuitConfigMode === 'GateSelectionMode'}
                    types={["selectGateBtn"]} name="Select"
                    onClick={handleSelectBtnClicked}/>
            <hr/>
            <DropdownButton buttonTypes={['dropdownBtn']} name={selectedStandardGate}
                            rightImageSource={arrow_down_black}>
                <Dropdown>
                    <DropdownList list={ALL_STD_GATES}
                                  onDropdownItemClicked={handleStandardGateDropdownItemClicked}
                                  type='standardGateDropdown'>

                    </DropdownList>
                </Dropdown>
            </DropdownButton>
            <hr/>
            <DropdownButton name={'Compound Gate'} buttonTypes={["dropdownBtn",'dropdownBtnRoundedRightCorners']}
                            rightImageSource={arrow_down_black}>
                <Dropdown>
                    <DropdownList list={compoundGates}
                              onDropdownItemClicked={handleCompoundGateDropdownItemClicked}
                                  type='compoundGateDropdown'

                    />
                </Dropdown>
            </DropdownButton>

            <Button selected={true} types={["circuitBtn", "circuitRunBtn"]} name="run" onClick={handleRunCircuitBtnClicked}/>
        </div>
    </div>)
}

export default NewCircuitToolbar;
