export const INIT_SELECTED_STANDARD_GATE_ACTION = "INIT_SELECTED_STANDARD_GATE";
export const UPDATE_SELECTED_STANDARD_GATE_ACTION = "UPDATE_SELECTED_STANDARD_GATE";
export const UPDATE_DEFAULT_STANDARD_GATE_ACTION = "UPDATE_DEFAULT_STANDARD_GATE";
export const UPDATE_GATE_SELECT_MODE_ACTION = "UPDATE_GATE_SELECT_MODE";

export const updateSelectedStandardGate = (gate : string) => async (dispatch : any) =>
{
    try {
        dispatch({ type: UPDATE_SELECTED_STANDARD_GATE_ACTION , payload: gate});
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateDefaultStandardGate = () => async (dispatch : any) => {
    try {
        dispatch({ type: UPDATE_DEFAULT_STANDARD_GATE_ACTION});
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateGateSelectMode = (mode : boolean) => async (dispatch : any) => {
    try {
        dispatch({type:UPDATE_GATE_SELECT_MODE_ACTION, payload: mode});
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}


