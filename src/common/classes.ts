import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";
import {IGate} from "./interfaces";
import {GateType} from "./types";

export class DeviceConnection implements DeviceConnectionState {
    connected: boolean;
    deviceName: string;
    constructor(connected : boolean, deviceName: string) {
        this.connected = connected;
        this.deviceName = deviceName;
    }
}

export class Gate implements IGate {
    x: number;
    y: number;
    width: number;
    height: number;
    type: GateType;
    constructor(
        x: number,
        y: number,
        width: number,
        height : number,
        type: GateType) {
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.type = type;
    }
}
