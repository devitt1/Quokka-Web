export const INIT_SELECTED_STANDARD_GATE_ACTION = "INIT_SELECTED_STANDARD_GATE";
export const UPDATE_SELECTED_STANDARD_GATE_ACTION = "UPDATE_SELECTED_STANDARD_GATE";

export const updateSelectedStandardGate = (gateName : string) => async (dispatch : any) =>
{
    try {
        dispatch({ type: UPDATE_SELECTED_STANDARD_GATE_ACTION , payload: gateName});
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}


