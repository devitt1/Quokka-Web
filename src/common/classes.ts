import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";
import {IGate} from "./interfaces";
import {GateType} from "./types";
import {v4} from 'uuid';

export class DeviceConnection implements DeviceConnectionState {
    connected: boolean;
    deviceName: string;
    constructor(connected : boolean, deviceName: string) {
        this.connected = connected;
        this.deviceName = deviceName;
    }
}

export class Gate implements IGate {
    id : string;
    x: number;
    y: number;
    width: number;
    height: number;
    rowIndex: number;
    colIndex : number;
    type: GateType;
    constructor(
        x: number,
        y: number,
        width: number,
        height : number,
        rowIndex : number,
        colIndex : number,
        type: GateType) {
        this.id = v4();
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.rowIndex = rowIndex;
       this.colIndex = colIndex;
       this.type = type;
    }
}
