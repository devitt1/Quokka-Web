import {combineReducers} from "@reduxjs/toolkit";
import {deviceConnectionReducer, DeviceConnectionState } from "./deviceConnectionReducer";
import {modalsReducer, ModalsState } from "./modalsReducer";
import circuitConfigReducer, {CircuitConfigState} from "./circuitConfigReducer";
import circuitOutputsReducer, {CircuitOutputsState} from "./circuitOutputsReducer";
import authReducer, {AuthState} from "./authReducer";

 export interface RootState {
    modals : ModalsState,
    auth : AuthState,
    deviceConnection : DeviceConnectionState,
    circuitConfig : CircuitConfigState,
    circuitOutputs : CircuitOutputsState,
}
const rootReducer = combineReducers<RootState>({
    modals : modalsReducer,
    auth : authReducer,
    deviceConnection : deviceConnectionReducer,
    circuitConfig : circuitConfigReducer,
    circuitOutputs : circuitOutputsReducer,
})

export default rootReducer;
