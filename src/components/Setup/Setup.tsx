import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleDeviceConnectionModal } from '../../redux/actions/modalsAction';
import styles from './Setup.module.scss';

const Setup : React.FC = () => {
    const dispatch = useDispatch();

    return (<div className={styles.setup}>
        <p>Instructions/informational page for how to connect the mobile to Quokka & also Quokka to the circuit builder</p>
        <p>Cater for standard text and images. This page needs to work on all devices.</p>
        <button
            onClick={() => {
                //open connection modal
                dispatch(toggleDeviceConnectionModal(true));
            }}
        >Connect to device</button>
    </div>)
}

export default Setup;
