import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {ModalState} from "../../../common/types";
import {ModalProps} from "./Modal";
import {closeModal} from "../../../redux/actions/modalsAction";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers/rootReducer";
import APIClient from "../../../api/APIClient";
import {updateCircuitRunningStatus} from "../../../redux/actions/circuitConfigAction";
import {BuildOutput} from "../../../common/classes";
import {addBuildOutput} from "../../../redux/actions/circuitOutputsAction";
import {IGate} from "../../../common/interfaces";
import {Button} from "../../Button/Button";
import Input from "../../Input/Input";

const RunCircuitModal : React.FC<ModalProps> = (props) => {
    const [modalState, setModalState] = useState(props.state);
    const [circuitRunCount, setCircuitRunCount] = useState(0);
    const [runEstimatedDuration, setRunEstimatedDuration] = useState(0);
    const apiClient : APIClient = new APIClient();
    const dispatch = useDispatch();
    const circuitConfig = useSelector((state: RootState) => state.circuitConfig);
    const droppedGates = useSelector<RootState, IGate[]>((state: RootState) => (state.circuitConfig.circuitState.droppedGates));

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleRunBtnClicked();
        }
    }

    const handleInputChanged = (event : any) => {
        const runCountValue = parseInt(event.target.value);
        const estimatedTimeValue = (3.021*Math.pow(10, -7) * Math.exp(0.6204 * circuitConfig.circuitState.qubits.length));
        console.log(estimatedTimeValue);
        setRunEstimatedDuration(estimatedTimeValue);
        setCircuitRunCount(runCountValue);

    }



    const handleRunBtnClicked = async () => {
        console.log("run btn clicked! dopped gates", circuitConfig.circuitState.droppedGates);
        const qasmScript = apiClient.qsimAPIService.createQASMScript(circuitConfig.circuitState.qubits,
            droppedGates);
        dispatch(updateCircuitRunningStatus(true));
        dispatch(closeModal(props.id));
        const response = await apiClient.qsimAPIService.runQASMScript(qasmScript, circuitRunCount, false);
        createNewBuildOutput(response.data.result.c);
        dispatch(updateCircuitRunningStatus(false));
    }

    const createNewBuildOutput = (outputData : number[][]) => {
        const newBuildOutput = new BuildOutput('New Untitled Circuit', outputData, runEstimatedDuration, `buildArrangement`);
        dispatch(addBuildOutput(newBuildOutput));
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
                    <Input
                        type="text"
                        styleTypes={["default"]}
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter number"
                    />
                    <p className={styles.italic}>Estimated processing time = {runEstimatedDuration}</p>
                    <div className={styles.buttonGroup}>
                        <Button name={'Cancel'} types={['standardBtn']}
                        onClick={async () => handleCancelBtnClicked()}/>
                        <Button name={'Run'} types={['standardBtn']}
                                onClick={async () => handleRunBtnClicked()}/>
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

export default RunCircuitModal;
