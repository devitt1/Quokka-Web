import {Payload} from "../../common/types";
import {
    ADD_DROPPED_GATE_ACTION, ADD_QUBIT_ACTION,
    INIT_SELECTED_STANDARD_GATE_ACTION, REMOVE_DRAGGING_GATE_ACTION,
    REMOVE_DROPPED_GATE_ACTION, REMOVE_QUBIT_ACTION,
    UPDATE_DEFAULT_STANDARD_GATE_ACTION,
    UPDATE_DRAGGING_GATE_ACTION, UPDATE_DRAGGING_GATE_POSITION,
    UPDATE_GATE_SELECT_MODE_ACTION,
    UPDATE_SELECTED_STANDARD_GATE_ACTION

} from "../actions/circuitConfigAction";
import {ICircuitState, IDraggableGate, IGate, IQubit} from "../../common/interfaces";
import {Gate, Qubit} from "../../common/classes";

export interface CircuitConfigState {
    selectedStandardGate: string,
    gateSelectMode : boolean,
    circuitState : ICircuitState
}

const initialCircuitConfigState = {
    selectedStandardGate : 'Standard Gate',
    gateSelectMode : false,
    circuitState : {
        droppedGates : [] as IGate[],
        draggingGate : {} as IDraggableGate,
        numQubits : 3,
        qubits : [
            new Qubit(45)
        ] as IQubit[]
    } as ICircuitState
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
                circuitState: {
                    ...state.circuitState,
                    droppedGates: [...state.circuitState.droppedGates, action.payload]
                }
            }
        case REMOVE_DROPPED_GATE_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    droppedGates: state.circuitState.droppedGates.filter(gate => (gate.id !== action.payload))
                }
            }

        case UPDATE_DRAGGING_GATE_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    draggingGate : action.payload
                }
            }

        case UPDATE_DRAGGING_GATE_POSITION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    draggingGate : {
                        x: action.payload.x,
                        y: action.payload.y,
                        width: state.circuitState.draggingGate.width,
                        height: state.circuitState.draggingGate.height,
                        rowIndex : state.circuitState.draggingGate.rowIndex,
                        colIndex : state.circuitState.draggingGate.colIndex,
                        qubitIds : state.circuitState.draggingGate.qubitIds,
                        type: state.circuitState.draggingGate.type
                    }
                }
            }

        case REMOVE_DRAGGING_GATE_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    draggingGate: {} as Gate
                }
            }

        //CircuitState operations
        case ADD_QUBIT_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    qubits : [...state.circuitState.qubits, new Qubit(39)]
                }
            }
        case REMOVE_QUBIT_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    qubits : state.circuitState.qubits.filter(qubit =>
                        (qubit.id !== action.payload.id))
                }
            }
        default:
            return state;
    }
}


export default circuitConfigReducer;
