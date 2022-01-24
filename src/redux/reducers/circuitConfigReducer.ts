import {Payload} from "../../common/types";
import {
    ADD_DROPPED_GATE_ACTION,
    INIT_SELECTED_STANDARD_GATE_ACTION, UPDATE_DEFAULT_STANDARD_GATE_ACTION,
    UPDATE_GATE_SELECT_MODE_ACTION,
    UPDATE_SELECTED_STANDARD_GATE_ACTION
} from "../actions/circuitConfigAction";
import {IGate} from "../../common/interfaces";
import {Gate} from "../../common/classes";



export interface CircuitConfigState {
    selectedStandardGate: string,
    gateSelectMode : boolean,
    droppedGates : IGate[]
}

const initialCircuitConfigState = {
    selectedStandardGate : 'Standard Gate',
    gateSelectMode : false,
    droppedGates : [new Gate(0, 39, 40, 38, 'X')]
}

function circuitConfigReducer (state = initialCircuitConfigState,
action: Payload) {
    switch (action.type) {
        //Selected Gates Store Operations

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

        //Dropped Gates Store Operations
        case ADD_DROPPED_GATE_ACTION:
            return {
                ...state,
                droppedGates: [...state.droppedGates, action.payload]
            }

        default:
            return state;
    }
}

export default circuitConfigReducer;
