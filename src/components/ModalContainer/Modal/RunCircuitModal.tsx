import React, {useEffect, useState} from 'react';
import styles from './Modal.module.scss';
import {ModalState} from "../../../common/types";
import logo from "../../../assets/logo.svg";
import {ModalProps} from "./Modal";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";

const RunCircuitModal : React.FC<ModalProps> = (props) => {
    const [modalState, setModalState] = useState(props.state);
    const [circuitRunCount, setCircuitRunCount] = useState(0);
    const [runEstimatedDuration, setRunEstimatedDuration] = useState(0);
    const [runOutput, setRunOutput] = useState("");
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();
    const circuitConfig = useSelector((state: RootState) => state.circuitConfig);

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleRunBtnClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        const runCountValue = parseInt(event.target.value);
        const estimatedTimeValue = (3.021*Math.pow(10, -7) * Math.exp(0.6204 * circuitConfig.circuitState.numQubits));
        console.log(estimatedTimeValue);
        setRunEstimatedDuration(estimatedTimeValue);
        setCircuitRunCount(runCountValue);

    }

    const handleRunBtnClicked = async () => {
        console.log("run btn clicked!");
        const qasmScript = apiClient.qsimAPIService.createQASMScript(circuitConfig.circuitState.numQubits,
            circuitConfig.droppedGates);
        const result = await apiClient.qsimAPIService.runQASMScript(qasmScript, circuitRunCount, false);
        setRunOutput(JSON.stringify(result.data.result.c));
    }

    const handleCancelBtnClicked = async () => {
        dispatch(closeModal(props.id));
    }

    const renderState = (state : ModalState) => {
        switch (state) {
            case 'StartRunCircuit':
                return(<div className={styles.content}>
                    <h1>Run circuit</h1>
                    <p>Enter how many times you want to run this circuit:</p>
                    <input
                        type="text"
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter number"
                    />
                    <p className={styles.italic}>Estimated processing time = {runEstimatedDuration}</p>
                    <div className={styles.buttonGroup}>
                        <button onClick={async () => handleCancelBtnClicked()}>
                            Cancel
                        </button>
                        <button onClick={async () => handleRunBtnClicked()}>
                            Run
                        </button>
                    </div>
                    <p>Run output</p>
                    <p>{runOutput}</p>
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

export default RunCircuitModal;
