export const INIT_MODAL_ACTION = "INIT_MODAL";
export const TOGGLE_DEVICE_CONNECTION_MODAL_ACTION = "TOGGLE_DEVICE_CONNECTION_MODAL"


export const toggleDeviceConnectionModal = (visible : boolean) => async (dispatch : any) => {
    try {
        dispatch ({ type: TOGGLE_DEVICE_CONNECTION_MODAL_ACTION, payload : visible});
    } catch (e) {
        console.log("Error: ", e);
        throw e;
    }
}
