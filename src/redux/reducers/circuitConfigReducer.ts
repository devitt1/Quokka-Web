import {CircuitConfigMode, Payload} from "../../common/types";
import {
    ADD_DROPPED_GATE_ACTION,
    ADD_QUBIT_ACTION,
    INIT_SELECTED_STANDARD_GATE_ACTION,
    REMOVE_DRAGGING_GATE_ACTION,
    REMOVE_DROPPED_GATE_ACTION,
    REMOVE_QUBIT_ACTION,
    UPDATE_CIRCUIT_RUNNING_STATUS_ACTION,
    UPDATE_DEFAULT_STANDARD_GATE_ACTION,
    UPDATE_DRAGGING_GATE_ACTION,
    UPDATE_DRAGGING_GATE_EXTENSION_ACTION,
    UPDATE_DRAGGING_GATE_POSITION,
    UPDATE_DROPPED_GATE_ACTION,
    UPDATE_DROPPED_GATE_EXTENSION_ACTION,
    UPDATE_GATE_INPUT_VALUE_ACTION,
    UPDATE_CIRCUIT_CONFIG_MODE_ACTION,
    UPDATE_QUBIT_ACTION,
    UPDATE_SELECTED_GATE_ID_ACTION,
    UPDATE_SELECTED_QUBIT_ACTION,
    UPDATE_SELECTED_STANDARD_GATE_ACTION,
    ADD_COMPOUND_GATE_DROPDOWN_ITEM_ACTION,
    UPDATE_CIRCUIT_CONFIG_TITLE_ACTION,
    LOAD_CIRCUIT_CONFIG_ACTION, UPDATE_CIRCUIT_ESTIMATED_BUILD_TIME_ACTION, UPDATE_SELECTED_COMPOUND_GATE_ACTION

} from "../actions/circuitConfigAction";
import {ICircuitState, IDraggableGate, IGate, IQubit} from "../../common/interfaces";
import {Gate, Qubit} from "../../common/classes";

export interface CircuitConfigState {
    circuitConfigTitle : string;
    selectedStandardGate: string;
    circuitConfigMode : CircuitConfigMode;
    estimatedBuildTime : number;
    selectedQubitId : string;
    selectedGateId : string;
    compoundGates : IGate[];
    selectedCompoundGate : IGate;
    status : boolean;
    viewOnly: boolean;
    circuitState : ICircuitState;
}

const initialCircuitConfigState = {
    circuitConfigTitle : 'New Untitled Circuit',
    selectedStandardGate : 'Standard Gate',
    circuitConfigMode : 'NoSelectionMode' as CircuitConfigMode,
    estimatedBuildTime : 0,
    selectedQubitId : "",
    selectedGateId: "",
    compoundGates: [] as IGate[],
    selectedCompoundGate: {} as IGate,
    status : false,
    viewOnly: false,
    circuitState : {
        droppedGates : [] as IGate[],
        draggingGate : {} as IDraggableGate,
        qubits : [
            new Qubit(45),
            new Qubit(45),
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
        case UPDATE_SELECTED_COMPOUND_GATE_ACTION:
            return {
                ...state,
                selectedCompoundGate: action.payload.gate
            }
        case UPDATE_DEFAULT_STANDARD_GATE_ACTION:
            return {
                ...state,
                selectedStandardGate: 'Standard Gate',
            }
        case UPDATE_CIRCUIT_CONFIG_MODE_ACTION:
            return {
                ...state,
                circuitConfigMode: action.payload.circuitConfigMode,
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
                        dragStartPosition : state.circuitState.draggingGate.dragStartPosition,
                        width: state.circuitState.draggingGate.width,
                        height: state.circuitState.draggingGate.height,
                        qubitIds : state.circuitState.draggingGate.qubitIds,
                        type: state.circuitState.draggingGate.type,
                        rotAngle : state.circuitState.draggingGate.rotAngle,
                        gateExtension: state.circuitState.draggingGate.gateExtension,
                        droppedFromMenu : state.circuitState.draggingGate.droppedFromMenu,
                        name: state.circuitState.draggingGate.name,
                        includedGates: state.circuitState.draggingGate.includedGates,
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

        case UPDATE_QUBIT_ACTION:
            return {
                ...state,
                circuitState:  {
                    ...state.circuitState,
                    qubits: updateQubitInArray(state.circuitState.qubits, action)
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
        case UPDATE_SELECTED_QUBIT_ACTION:
            return {
                ...state,
                selectedQubitId: action.payload
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

        case UPDATE_DRAGGING_GATE_EXTENSION_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    draggingGate: {
                        ...state.circuitState.draggingGate,
                        gateExtension : {
                            ...state.circuitState.draggingGate.gateExtension,
                            targetY : action.payload
                        }
                    }
                }
            }
        case UPDATE_DROPPED_GATE_EXTENSION_ACTION:
            console.log('update dorpped gate ext', action.payload);
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    droppedGates: updateObjectInArray(state.circuitState.droppedGates, action,'gateExtension' )
                }
            }
        case UPDATE_DROPPED_GATE_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    droppedGates: updateObjectInArray(state.circuitState.droppedGates, action, null)
                }
            }
        case UPDATE_CIRCUIT_RUNNING_STATUS_ACTION:
            return {
                ...state,
                status: action.payload
            }

        case UPDATE_GATE_INPUT_VALUE_ACTION:
            return {
                ...state,
                circuitState: {
                    ...state.circuitState,
                    droppedGate: updateObjectInArray(state.circuitState.droppedGates, action, null)
                }
            }
        case UPDATE_SELECTED_GATE_ID_ACTION:
            return {
                ...state,
                selectedGateId: action.payload.id
            }

        case ADD_COMPOUND_GATE_DROPDOWN_ITEM_ACTION:
            return {
                ...state,
                compoundGates: [...state.compoundGates, action.payload.compoundGate]
            }
        case UPDATE_CIRCUIT_CONFIG_TITLE_ACTION:
            return {
                ...state,
                circuitConfigTitle: action.payload.circuitConfigTitle
            }
        case LOAD_CIRCUIT_CONFIG_ACTION:
            return {
                ...state,
                circuitConfigTitle: action.payload.circuitConfigTitle,
                circuitState: action.payload.circuitState,
                compoundGates: action.payload.compoundGates
            }
        case UPDATE_CIRCUIT_ESTIMATED_BUILD_TIME_ACTION:
            return {
                ...state,
                estimatedBuildTime: action.payload.estimatedBuildTime
            }
        default:
            return state;
    }
}


export default circuitConfigReducer;

export const updateQubitInArray = (array : IQubit[], action : Payload) => {
    return array.map((item, index) => {
        if (item.id !== action.payload.id) {
            return item;
        }

        let newQubit = item;

        // @ts-ignore
        newQubit[action.payload.property] = action.payload.value;

        return {
            ...item,
            ...newQubit
        }
    })
}

export const updateObjectInArray = (array : IGate[], action : Payload, innerProperty : string | null) => {
    return array.map((item, index) => {


        if (item.id !== action.payload.id) {
            return item;
        }

        let newGate = item;

        if (innerProperty) {
            // @ts-ignore
            newGate[innerProperty][action.payload.property] = action.payload.value;
        } else {

            // @ts-ignore
            newGate[action.payload.property] = action.payload.value;
        }
        return {
            ...item,
            ...newGate
        }
    })
}
