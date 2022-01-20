import {Payload} from "../../common/types";
import {INIT_SELECTED_STANDARD_GATE_ACTION, UPDATE_SELECTED_STANDARD_GATE_ACTION} from "../actions/circuitConfigAction";
import exp from "constants";

export interface CircuitConfigState {
    selectedStandardGate: string
}

const initialCircuitConfigState = {
    selectedStandardGate : 'default'
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
                selectedStandardGate: action.payload
            }
        default:
            return state;
    }
}

export default circuitConfigReducer;
