import {Payload} from "../../common/types";
import {IBuildOutput} from "../../common/interfaces";
import {BuildOutput} from "../../common/classes";
import {ADD_BUILD_OUTPUT_ACTION, INIT_CIRCUIT_OUTPUTS_ACTION} from "../actions/circuitOutputsAction";

export interface CircuitOutputsState {
    buildOutputs : IBuildOutput[]
}

const initialCircuitOutputsState = {
    buildOutputs : [
        new BuildOutput(
            'First',
            [[0,1], [0,1]],
            5,
            'buildArrangement#1'
        ), new BuildOutput(
            'Second',
            [[0,1], [1,0]],
            10,
            'buildArrangement#2'
        ),   new BuildOutput(
            'Third',
            [[0, 0], [0,0]],
            15,
            'buildArrangement#3'
        )

    ] as IBuildOutput[]
}

function circuitOutputsReducer (state = initialCircuitOutputsState, action: Payload) {
    switch (action.type) {
        case INIT_CIRCUIT_OUTPUTS_ACTION:
            return {
                ...state,
                initialCircuitOutputsState
            }
        case ADD_BUILD_OUTPUT_ACTION:
            return {
                ...state,
                buildOutputs: [...state.buildOutputs, action.payload]
            }
        default:
            return state;
    }
}

export default circuitOutputsReducer;
