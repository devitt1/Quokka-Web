import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {sleep} from "../../../common/helpers";
import {updateDeviceConnectionStatus} from "../../../redux/actions/deviceConnectionAction";
import {DeviceConnection} from "../../../common/classes";
import {closeModal} from "../../../redux/actions/modalsAction";
import logo from "../../../assets/logo.svg";
import {useDispatch} from "react-redux";
import APIClient from "../../../api/APIClient";
import {ModalState} from "../../../common/types";
import {ModalProps} from "./Modal";


const ConnectionModal : React.FC<ModalProps>= (props) => {
    const [deviceName, setDeviceName] = useState('theqbox01');
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(props.state);
    const apiClient : APIClient = new APIClient();

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleConnectBtnClicked();
        }
    }

    const handleConnectBtnClicked = async () => {
        setModalState('Connecting');
        await sleep(1500);
        const connectionResponse = await apiClient.circuitBuilderAPIService.getDeviceConnectionStatus(deviceName);
        dispatch(updateDeviceConnectionStatus(new DeviceConnection(connectionResponse.data, deviceName)));
        window.sessionStorage.setItem('deviceName', deviceName);
        setModalState('Connected');
        await sleep(1000);
        dispatch(closeModal(props.id));
    }

    const handleInputChanged = (event : any) => {
        setDeviceName(event.target.value);

    }


    const renderState = (state : ModalState) => {
        switch (state) {
            case 'StartConnection':
                return(<div className={styles.content}>
                    <h1>Connect to a Quokka Device</h1>
                    <p>Instructions about what the user should do or expect
                        when connecting to a Quokka device.</p>
                    <p>Connect a Quokka device to use the circuit builder.</p>
                    <input
                        type="text"
                        onChange={handleInputChanged}
                        onKeyDown={handleKeyDown}
                        placeholder="Device name"
                    />
                    <button onClick={async () => handleConnectBtnClicked()}>
                        Connect
                    </button>
                </div>)
            case 'Connecting':
                return (
                    <div className={styles.content}>
                        <h1>Connecting to Quokka device</h1>
                        <p>Please wait while we connect to {deviceName}</p>
                        <div className={`${styles.spinner} ${styles['black']} ${styles['sm']}`}>
                        </div>
                    </div>);
            case 'Connected':
                return ( <div className={styles.content}>
                    <h1>Successfully Connected to a Quokka</h1>
                    <p>You are now connected to {deviceName}</p>
                    <img src={logo}>
                    </img>
                </div>);
            default:
                return <div><h1>Error Opening Modal</h1></div>;
        }
    }


    return <div>{
        renderState(modalState)
    }</div>

}

export default ConnectionModal;
