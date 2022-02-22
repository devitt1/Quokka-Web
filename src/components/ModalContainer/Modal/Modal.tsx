import React, {useRef } from 'react';
import styles from './Modal.module.scss';
import {ModalState, ModalType} from "../../../common/types";
import ConnectionModal from "./ConnectionModal";
import RunCircuitModal from "./RunCircuitModal";
import EditGateInputModal from "./EditGateInputModal";

export interface ModalProps {
    id: string,
    type : ModalType,
    state : ModalState,
    extras?: any,
}


export const Modal : React.FC<ModalProps> = (children) => {
    const {id, type, state, extras} = children;

    const modalRef = useRef(null);
    const renderModal = (id : string, type : ModalType, state : ModalState) => {
        switch (type) {
            case "ConnectionModal":
                return <ConnectionModal id={id} type={type} state={state}/>;
            case "RunCircuitModal":
                return <RunCircuitModal id={id} type={type} state={state}/>;
            case "EditGateInputModal":
                return <EditGateInputModal id={id} type={type} state={state} extras={extras}/>
            case "LoginModal":
                return <div className={styles.content}>
                    <h1> Login Modal </h1>
                </div>
            default:
                return <div></div>
        }
    }

    return <div ref={modalRef} className={styles.modal}>
        {
            renderModal(id, type, state)
        }
    </div>
}
