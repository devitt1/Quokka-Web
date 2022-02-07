import {Payload} from "../../common/types";
import {IBuildOutput} from "../../common/interfaces";

export interface CircuitOutputsState {
    buildOutputs : IBuildOutput[]
}

const initialCircuitOutputsState = {
    buildOutputs : [] as IBuildOutput[]
}

function circuitOutputsReducer (state = initialCircuitOutputsState, action: Payload) {
    switch (action.type) {
        default:
            return state;
    }
}

export default circuitOutputsReducer;
