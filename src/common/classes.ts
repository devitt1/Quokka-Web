import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";
import {ICoordinate, IDraggableGate, IGate, IModal, IQubit, IQubitCell} from "./interfaces";
import {GateType, ModalState, ModalType} from "./types";
import {v4} from 'uuid';
import {ModalsState} from "../redux/reducers/modalsReducer";

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

export class DraggableGate implements IDraggableGate {
    id : string;
    x: number;
    y: number;
    dragStartPosition : ICoordinate;
    width: number;
    height: number;
    rowIndex: number;
    colIndex : number;
    type: GateType;
    constructor(
        x: number,
        y: number,
        dragStartPosition : ICoordinate,
        width: number,
        height : number,
        rowIndex : number,
        colIndex : number,
        type: GateType) {
        this.id = v4();
        this.x = x;
        this.y = y;
        this.dragStartPosition = dragStartPosition;
        this.width = width;
        this.height = height;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.type = type;
    }
}

export class Qubit implements IQubit {
    id: string;
    size : number;
    qubitCells: IQubitCell[];
    constructor(size : number) {
        this.id = v4();
        this.size = size;
        const cols = Array.from(Array(size).keys());
        var tempQubitCells = [] as IQubitCell[];
        cols.map((col) => {
            tempQubitCells.push(new QubitCell(48 * col))
        })
        this.qubitCells = tempQubitCells;
    }
}

export class QubitCell implements IQubitCell {
    id: string;
    x: number;

    constructor(x : number) {
        this.id = v4();
        this.x = x;
    }
}

export class Modal implements IModal {
    id: string;
    type : ModalType;
    state : ModalState;

    constructor(
        type : ModalType,
        state : ModalState
    ) {
        this.id = v4();
        this.type = type;
        this.state = state;

    }
}
