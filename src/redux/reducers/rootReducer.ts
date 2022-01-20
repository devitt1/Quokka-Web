import {combineReducers} from "@reduxjs/toolkit";
import {deviceConnectionReducer, DeviceConnectionState } from "./deviceConnectionReducer";
import {modalsReducer, ModalsState } from "./modalsReducer";
import circuitConfigReducer, {CircuitConfigState} from "./circuitConfigReducer";

 export interface RootState {
    modals : ModalsState
    deviceConnection : DeviceConnectionState
    circuitConfig : CircuitConfigState
}
const rootReducer = combineReducers<RootState>({
    modals : modalsReducer,
    deviceConnection : deviceConnectionReducer,
    circuitConfig : circuitConfigReducer
})

export default rootReducer;
