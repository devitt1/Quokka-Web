import  {IDraggableGate, IGate} from "../../common/interfaces";


// SELECTED GATE OPERATIONS
export const INIT_SELECTED_STANDARD_GATE_ACTION = "INIT_SELECTED_STANDARD_GATE";
export const UPDATE_SELECTED_STANDARD_GATE_ACTION = "UPDATE_SELECTED_STANDARD_GATE";
export const UPDATE_DEFAULT_STANDARD_GATE_ACTION = "UPDATE_DEFAULT_STANDARD_GATE";
export const UPDATE_GATE_SELECT_MODE_ACTION = "UPDATE_GATE_SELECT_MODE";

// DROPPED GATES OPERATIONS
export const ADD_DROPPED_GATE_ACTION = "ADD_DROPPED_GATE";
export const REMOVE_DROPPED_GATE_ACTION = "REMOVE_DROPPED_GATE";

// DRAGGING GATE OPERATIONS
export const UPDATE_DRAGGING_GATE_ACTION = "UPDATE_DRAGGING_GATE";
export const REMOVE_DRAGGING_GATE_ACTION = "REMOVE_DRAGGING_GATE";
export const UPDATE_DRAGGING_GATE_POSITION = "UPDATE_DRAGGING_GATE_POSITION"

// CIRCUIT STATE OPERATIONS
export const ADD_QUBIT_ACTION = "ADD_QUBIT";

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

export const addDroppedGate = (gate : IGate) => async (dispatch : any) => {
    try {
        console.log(`Adding dropped gate at cell [${gate.rowIndex}, ${gate.colIndex}]`);
        dispatch({type: ADD_DROPPED_GATE_ACTION, payload: gate})
    }
    catch (e) {
        console.log("Error ", e);
        throw e;
    }
}

// export const removeDroppedGate = (gate : IGate) => async (dispatch : any) => {
//     try {
//         console.log(`Removing dropped gate at cell [${gate.rowIndex}, ${gate.colIndex}]`);
//         dispatch({type: REMOVE_DROPPED_GATE_ACTION, payload: gate})
//     }
//     catch (e) {
//         console.log("Error ", e);
//         throw e;
//     }
// }

export const removeDroppedGate = (id : string) => async (dispatch : any) => {
    try {
        console.log(`Removing dropped gate with id=${id}`);
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

