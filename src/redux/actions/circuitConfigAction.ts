import {ICircuitState, IDraggableGate, IGate, IGateExtension} from "../../common/interfaces";
import {CircuitConfigMode} from "../../common/types";

// UPDATE CIRCUIT CONFIG TITLE
export const UPDATE_CIRCUIT_CONFIG_TITLE_ACTION = "UPDATE_CIRCUIT_CONFIG_TITLE";

// SELECTED GATE OPERATIONS
export const INIT_SELECTED_STANDARD_GATE_ACTION = "INIT_SELECTED_STANDARD_GATE";
export const UPDATE_SELECTED_STANDARD_GATE_ACTION = "UPDATE_SELECTED_STANDARD_GATE";
export const UPDATE_SELECTED_COMPOUND_GATE_ACTION = "UPDATE_SELECTED_COMPOUND_GATE";
export const UPDATE_DEFAULT_STANDARD_GATE_ACTION = "UPDATE_DEFAULT_STANDARD_GATE";
export const UPDATE_CIRCUIT_CONFIG_MODE_ACTION = "UPDATE_CIRCUIT_CONFIG_MODE";
export const UPDATE_SELECTED_GATE_ID_ACTION = "UPDATE_SELECTED_GATE_ID";

// DROPPED GATES OPERATIONS
export const ADD_DROPPED_GATE_ACTION = "ADD_DROPPED_GATE";
export const REMOVE_DROPPED_GATE_ACTION = "REMOVE_DROPPED_GATE";
export const UPDATE_DROPPED_GATE_ACTION = "UPDATE_DROPPED_GATE";

// DRAGGING GATE OPERATIONS
export const UPDATE_DRAGGING_GATE_ACTION = "UPDATE_DRAGGING_GATE";
export const REMOVE_DRAGGING_GATE_ACTION = "REMOVE_DRAGGING_GATE";
export const UPDATE_DRAGGING_GATE_POSITION = "UPDATE_DRAGGING_GATE_POSITION"

// CIRCUIT STATE OPERATIONS
export const ADD_QUBIT_ACTION = "ADD_QUBIT";
export const REMOVE_QUBIT_ACTION = "REMOVE_QUBIT";
export const UPDATE_SELECTED_QUBIT_ACTION = "UPDATE_SELECTED_QUBIT";
export const UPDATE_QUBIT_ACTION = "UPDATE_QUBIT_POSITION"
// DRAGGING GATE EXTENSION OPERATIONS
export const UPDATE_DRAGGING_GATE_EXTENSION_ACTION= "UPDATE_DRAGGING_GATE_EXTENSION";
export const UPDATE_DROPPED_GATE_EXTENSION_ACTION="UPDATE_DROPPED_GATE_EXTENSION";

// CIRCUIT RUNNING OPERATIONS
export const UPDATE_CIRCUIT_RUNNING_STATUS_ACTION = "UPDATE_CIRCUIT_RUNNING_STATUS";

// UPDATE GATE INPUT PARAMETER
export const UPDATE_GATE_INPUT_VALUE_ACTION = "UPDATE_GATE_INPUT_VALUE_ACTION";

// COMPOUND GATE DROPDOWN OPERATIONS
export const ADD_COMPOUND_GATE_DROPDOWN_ITEM_ACTION = "ADD_COMPOUND_GATE_DROPDOWN_ITEM"

export const LOAD_CIRCUIT_CONFIG_ACTION = "LOAD_CIRCUIT_CONFIG";

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

export const updateSelectedCompoundGate = (gate : IGate) => async (dispatch : any) =>
{
    try {
        dispatch({ type: UPDATE_SELECTED_COMPOUND_GATE_ACTION , payload: {gate : gate}});
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

export const updateCircuitConfigMode = (mode : CircuitConfigMode) => async (dispatch : any) => {
    try {
        dispatch({type:UPDATE_CIRCUIT_CONFIG_MODE_ACTION, payload: {circuitConfigMode : mode}});
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const addDroppedGate = (gate : IGate) => async (dispatch : any) => {
    try {
        dispatch({type: ADD_DROPPED_GATE_ACTION, payload: gate})
    }
    catch (e) {
        console.log("Error ", e);
        throw e;
    }
}

export const removeDroppedGate = (id : string) => async (dispatch : any) => {
    try {
        dispatch({type: REMOVE_DROPPED_GATE_ACTION, payload: id})
    }
    catch (e) {
        console.log("Error ", e);
        throw e;
    }
}


export const updateDraggingGate = (gate : IDraggableGate) => async (dispatch : any) => {
    try {
        dispatch({type: UPDATE_DRAGGING_GATE_ACTION, payload: gate})
    }
    catch (e) {
        console.log("Error ", e);
        throw e;
    }
}

export const updateDraggingGatePosition = (x: number, y :number) => async (dispatch: any) =>{
    try {
        dispatch({type: UPDATE_DRAGGING_GATE_POSITION, payload: {x, y}})
    }
    catch (e) {
        console.log("Error ", e);
        throw e;
    }
}


export const removeDraggingGate = () => async (dispatch : any) => {
    try {
        dispatch({type: REMOVE_DRAGGING_GATE_ACTION, payload: null})
    }
    catch (e) {
        console.log("Error ", e);
        throw e;
    }
}


export const addQubit = () => async (dispatch : any) => {
    try {
        dispatch({type: ADD_QUBIT_ACTION, payload: null})
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateSelectedQubit = (id : string) => async (dispatch : any) => {
    try {
        dispatch({type: UPDATE_SELECTED_QUBIT_ACTION, payload: id})
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateQubit = (id: string, property :string, value : any) => async (dispatch : any) => {
    try {
        dispatch({type: UPDATE_QUBIT_ACTION, payload: {id: id, property : property, value: value}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const removeQubit = (id : string) => async (dispatch : any) => {
    try {
        dispatch({type: REMOVE_QUBIT_ACTION, payload: {id: id}})
    }
    catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateDraggingGateExtension = (targetY : number) => async (dispatch : any) => {
    try {
        dispatch({type: UPDATE_DRAGGING_GATE_EXTENSION_ACTION, payload: targetY})

    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateDroppedGateExtension = (id : string, property : string, value : any) => async (dispatch : any) => {
    try {
        dispatch({type: UPDATE_DROPPED_GATE_EXTENSION_ACTION, payload: {id: id, property : property, value : value}})

    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateDroppedGate = (id : string, property : string, value : any) => async (dispatch : any) => {
    try {
        dispatch({type: UPDATE_DROPPED_GATE_ACTION, payload: {id: id, property : property, value : value}})

    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateCircuitRunningStatus = (status : boolean) => async (dispatch: any) => {
    try {
        dispatch({type: UPDATE_CIRCUIT_RUNNING_STATUS_ACTION, payload: status});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const updateSelectedGateId = (id : string) => async (dispatch: any) => {
    try {
        dispatch({type: UPDATE_SELECTED_GATE_ID_ACTION, payload: {id: id}});

    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}

export const addCompoundGateDropdown = (compoundGate : IGate) => async (dispatch: any) => {
    try {
        dispatch({type: ADD_COMPOUND_GATE_DROPDOWN_ITEM_ACTION, payload: {compoundGate: compoundGate}})
    } catch (e) {
        console.log("Error", e);
        throw e;
    }
}

export const updateCircuitConfigTitle = (title: string) => async (dispatch: any) => {
    try {
        dispatch({type: UPDATE_CIRCUIT_CONFIG_TITLE_ACTION, payload: {circuitConfigTitle: title}});
    } catch (e) {
        console.log("Error", e);
        throw e;
    }
}

export const loadCircuitConfig = (circuitConfigTitle: string, circuitState: ICircuitState | null, compoundGates : IGate[]) => async (dispatch: any) => {
    try {
        dispatch({type: LOAD_CIRCUIT_CONFIG_ACTION, payload: {
            circuitConfigTitle: circuitConfigTitle,
            circuitState: circuitState,
            compoundGates : compoundGates
        }});
    } catch (e) {
        console.log("Error", e);
        throw e;
    }
}

export const  UPDATE_CIRCUIT_ESTIMATED_BUILD_TIME_ACTION = "UPDATE_CIRCUIT_ESTIMATED_BUILD_TIME";

export const updateCircuitEstimatedBuildTime = (estimatedBuildTime : number) => async(dispatch : any) => {
    try {
        dispatch({type: UPDATE_CIRCUIT_ESTIMATED_BUILD_TIME_ACTION, payload: {estimatedBuildTime: estimatedBuildTime}});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}
