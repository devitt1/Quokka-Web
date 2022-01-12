import {combineReducers} from "@reduxjs/toolkit";
import {deviceConnectionReducer, DeviceConnectionState } from "./deviceConnectionReducer";
import {modalsReducer, ModalsState } from "./modalsReducer";

export interface RootState {
    modals : ModalsState
    deviceConnection : DeviceConnectionState
}
const rootReducer = combineReducers<RootState>({
    modals : modalsReducer,
    deviceConnection : deviceConnectionReducer
})

export default rootReducer;
