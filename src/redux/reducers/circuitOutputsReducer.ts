import {Payload} from "../../common/types";
import {IBuildOutput} from "../../common/interfaces";
import {BuildOutput} from "../../common/classes";
import {INIT_CIRCUIT_OUTPUTS_ACTION} from "../actions/circuitOutputsAction";

export interface CircuitOutputsState {
    buildOutputs : IBuildOutput[]
}

const initialCircuitOutputsState = {
    buildOutputs : [
        new BuildOutput(
            'First',
            'buildOutput#1',
            5,
            'buildArrangement#1'
        ), new BuildOutput(
            'Second',
            'buildOutput#2',
            10,
            'buildArrangement#2'
        ),   new BuildOutput(
            'Third',
            'buildOutput#3',
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
        default:
            return state;
    }
}

export default circuitOutputsReducer;
