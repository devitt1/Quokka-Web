import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";

export class DeviceConnection implements DeviceConnectionState {
    connected: boolean;
    deviceName: string;
    constructor(connected : boolean, deviceName: string) {
        this.connected = connected;
        this.deviceName = deviceName;
    }
}
