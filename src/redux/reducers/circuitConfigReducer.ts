import {Payload} from "../../common/types";
import {
    ADD_DROPPED_GATE_ACTION,
    INIT_SELECTED_STANDARD_GATE_ACTION, REMOVE_DRAGGING_GATE_ACTION,
    REMOVE_DROPPED_GATE_ACTION,
    UPDATE_DEFAULT_STANDARD_GATE_ACTION,
    UPDATE_DRAGGING_GATE_ACTION, UPDATE_DRAGGING_GATE_POSITION,
    UPDATE_GATE_SELECT_MODE_ACTION,
    UPDATE_SELECTED_STANDARD_GATE_ACTION

} from "../actions/circuitConfigAction";
import {IGate} from "../../common/interfaces";
import {Gate} from "../../common/classes";

export interface CircuitConfigState {
    selectedStandardGate: string,
    gateSelectMode : boolean,
    droppedGates : IGate[],
    draggingGate : IGate
}

const initialCircuitConfigState = {
    selectedStandardGate : 'Standard Gate',
    gateSelectMode : false,
    droppedGates : [] as Gate[],
    draggingGate : {} as Gate
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
        case REMOVE_DROPPED_GATE_ACTION:
            return {
                ...state,
                droppedGates: state.droppedGates.filter(gate => (gate.id !== action.payload))
            }

        case UPDATE_DRAGGING_GATE_ACTION:
            return {
                ...state,
                draggingGate : action.payload
            }

        case UPDATE_DRAGGING_GATE_POSITION:
            return {
                ...state,
               draggingGate : {
                   x: action.payload.x,
                   y: action.payload.y,
                   width: state.draggingGate.width,
                   height: state.draggingGate.height,
                   rowIndex : state.draggingGate.rowIndex,
                   colIndex : state.draggingGate.colIndex,
                   type: state.draggingGate.type
                }
            }

        case REMOVE_DRAGGING_GATE_ACTION:
            return {
                ...state,
                draggingGate: {} as Gate

            }

        default:
            return state;
    }
}


export default circuitConfigReducer;
