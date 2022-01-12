import {Payload} from '../../common/types';
import { INIT_MODAL_ACTION, TOGGLE_DEVICE_CONNECTION_MODAL_ACTION } from '../actions/modalsAction';


export interface ModalsState {
    showDeviceConnectionModal : boolean,
}

const initialModalState = {
    showDeviceConnectionModal : false
}

function modalsReducer (
    state = initialModalState,
    action : Payload) {
    switch (action.type) {
        case INIT_MODAL_ACTION:
            return {
                ...state,
                initialModalState
            };
        case TOGGLE_DEVICE_CONNECTION_MODAL_ACTION :
            return {
                ...state,
                showDeviceConnectionModal: action.payload,
            }
        default:
            return state;
    }
}


export {modalsReducer}
