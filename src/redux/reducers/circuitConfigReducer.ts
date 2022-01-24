import {Payload} from "../../common/types";
import {
    INIT_SELECTED_STANDARD_GATE_ACTION, UPDATE_DEFAULT_STANDARD_GATE_ACTION,
    UPDATE_GATE_SELECT_MODE_ACTION,
    UPDATE_SELECTED_STANDARD_GATE_ACTION
} from "../actions/circuitConfigAction";



export interface CircuitConfigState {
    selectedStandardGate: string,
    gateSelectMode : boolean,
    // gates : Gate[]
}

const initialCircuitConfigState = {
    selectedStandardGate : 'Standard Gate',
    gateSelectMode : false,
    // gates:
}

function circuitConfigReducer (state = initialCircuitConfigState,
action: Payload) {
    switch (action.type) {
        case INIT_SELECTED_STANDARD_GATE_ACTION:
            return {
                ...state,
                initialCircuitConfigState
            }
        case UPDATE_SELECTED_STANDARD_GATE_ACTION:
            return {
                ...state,
                selectedStandardGate: action.payload,
            }
        case UPDATE_DEFAULT_STANDARD_GATE_ACTION:
            return {
                ...state,
                selectedStandardGate: 'Standard Gate',
            }
        case UPDATE_GATE_SELECT_MODE_ACTION:
            return {
                ...state,
                gateSelectMode: action.payload,
            }
        default:
            return state;
    }
}

export default circuitConfigReducer;
