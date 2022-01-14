import React, {useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDeviceConnectionModal } from '../../redux/actions/modalsAction';
import { RootState } from '../../redux/reducers/rootReducer';
import APIClient from '../../api/APIClient';
import logo from '../../assets/logo.svg'

import { updateDeviceConnectionStatus } from '../../redux/actions/deviceConnectionAction';
import { DeviceConnection } from '../../common/classes';
import { sleep } from '../../common/helpers';
interface ModalProps {

}


export const Modal : React.FC<ModalProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [deviceName, setDeviceName] = useState('theqbox01');
    const dispatch = useDispatch();
    const shouldDisplayModal = useSelector((state: RootState) => state.modals);
    const modalRef = useRef(null);
    const [shouldDisplayResultIcon, setShouldDisplayResultIcon] = useState(false);
    const apiClient : APIClient = new APIClient();

    const handleKeyDown = async (event : any) => {
        if (event.key === 'Enter') {
            await handleButtonClicked();
        }
    }

    const handleButtonClicked = async () => {
        //dispatch action
        //get information from API
        setLoading(true);
        await sleep(1500);
        setLoading(false);
        const connectionResponse = await apiClient.circuitBuilderAPIService.getDeviceConnectionStatus(deviceName);
        dispatch(updateDeviceConnectionStatus(new DeviceConnection(connectionResponse.data, deviceName)));
        window.sessionStorage.setItem('deviceName', deviceName);
        setShouldDisplayResultIcon(true);
        await sleep(1000);
        setShouldDisplayResultIcon(false);
        dispatch(toggleDeviceConnectionModal(false));
    }

    const handleInputChanged = (event : any) => {
        setDeviceName(event.target.value);

    }

    const conditionalRender = (loading : boolean, shouldDisplayResultIcon : boolean ) => {
        console.log('conditionalRender', deviceName);
        if (!loading && !shouldDisplayResultIcon) {
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
                ></input>
                <button onClick={async () => handleButtonClicked()}>
                    Connect
                </button>
            </div>)
        }
        else if (shouldDisplayResultIcon && !loading)  {
            return (
                <div className={styles.content}>
                    <h1>Successfully Connected to a Quokka</h1>
                    <p>You are now connected to {deviceName}</p>
                    <img src={logo}>
                    </img>
                </div>);
        }
        else if (loading && !shouldDisplayResultIcon) {
            return (
                    <div className={styles.content}>
                        <h1>Connecting to Quokka device</h1>
                        <p>Please wait while we connect to {deviceName}</p>
                        <div className={`${styles.spinner} ${styles['black']} ${styles['sm']}`}>
                        </div>
                    </div>)
            }
    }

    if (shouldDisplayModal.showDeviceConnectionModal) {
        return <div ref={modalRef} className={styles.modal}>
            {
                conditionalRender(loading, shouldDisplayResultIcon)
            }
        </div>
    } else
    {
        return null;
    }
}
