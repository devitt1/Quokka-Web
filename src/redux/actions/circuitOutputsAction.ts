//CIRCUIT OUTPUT OPERATIONS
import {IBuildOutput} from "../../common/interfaces";

export const INIT_CIRCUIT_OUTPUTS_ACTION = "INIT_CIRCUIT_OUTPUTS";
export const ADD_BUILD_OUTPUT_ACTION = "ADD_BUILD_OUTPUT";

export const addBuildOutput = (buildOutput : IBuildOutput) => async (dispatch : any) => {
    try {
        dispatch({type: ADD_BUILD_OUTPUT_ACTION, payload: buildOutput});
    } catch (e) {
        console.log("Error: ", e);
    }
}
