import React, {useRef, useState} from 'react';
import styles from './Toolbar.module.scss';
import arrow_down from '../../../assets/arrow_down.svg';
import {Dropdown} from "../../Dropdown/Dropdown";
import {Button} from "../../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import {updateGateSelectMode} from "../../../redux/actions/circuitConfigAction";
import {openModal} from "../../../redux/actions/modalsAction";
import {Modal} from "../../../common/classes";
import {ALL_STD_GATES} from "../../../common/types";
import Accordion from "../../Accordion/Accordion";

const Toolbar : React.FC = () => {
    const circuitConfig = useSelector((state: RootState) => state.circuitConfig);
    const dispatch = useDispatch();
    const [fileManagerClicked, setFileManagerClicked] = useState(false);
    const [circuitTitle, setCircuitTitle] = useState('New Untitled Circuit')
    const [editCircuitDisabled, setEditCircuitDisabled] = useState(true);
    const circuitTitleRef : any = useRef(null);
    const handleSelectBtnClicked = () => {
        dispatch(updateGateSelectMode(!circuitConfig.gateSelectMode));
    }

    const handleRunCircuitBtnClicked = () =>  {
        dispatch(openModal(new Modal('RunCircuitModal', 'StartRunCircuit')));
    }

    const handleFileManagerDropdownClicked = () => {
        setFileManagerClicked(!fileManagerClicked);
        console.log("file manager dropdown clicked!");

    }

    const handleDropdownItemClicked = (dropdownItem: string) => {

    }

    const handleCircuitTitleInputChanged = (event : any) => {
        setCircuitTitle(event.target.value);
    }

    const handleCircuitTitleClicked = (event : any) => {
        console.log('double clicked!');
        setEditCircuitDisabled(false);
    }

    const handleCircuitTitleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            setEditCircuitDisabled(true);
        }
    }

    return (<div className={styles.toolbar}>
        <div className={styles.fileManager} >
            <h3>Q</h3>
            <img src={arrow_down} style={{height: 15, width:15}} onClick={handleFileManagerDropdownClicked}/>
            {
                fileManagerClicked ? <div className={styles.dropdownList}>
                        {
                            ['View', 'Load', 'Save', 'Save as'].map((dropdownItem, index) =>
                                (<div key={index} className={styles.dropdownItem} onClick={() => handleDropdownItemClicked(dropdownItem)}>
                                    <p>{dropdownItem}</p>
                                </div>)
                            )
                        }
                    </div> :
                    null
            }
            <input type="text"
                   ref={circuitTitleRef}
                   style={editCircuitDisabled ? {cursor: "default"} : {cursor: 'text'}}
                   value={circuitTitle}
                   readOnly={editCircuitDisabled}
                   className={styles.circuitEditableTitle}
                   onChange={handleCircuitTitleInputChanged}
                   onDoubleClick={handleCircuitTitleClicked}
                   onKeyDown={handleCircuitTitleKeyDown}
            />
        </div>

        <div className={styles.gateDropdowns}>
            <Button selected={circuitConfig.gateSelectMode} buttonStyle="selectGateBtn" name="Select"
                    onClick={handleSelectBtnClicked}/><Dropdown dropdownContent={ALL_STD_GATES} borderStyle="none"
                                                                name={circuitConfig.selectedStandardGate}/>
            <Dropdown dropdownContent={["compound gate"]} borderStyle="roundedRightCorner"  name="Compound Gate"/>
            <Button selected={true} buttonStyle="runCircuitBtn" name="run" onClick={handleRunCircuitBtnClicked}/>
        </div>
    </div>)

}



export default Toolbar;
