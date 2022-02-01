import {GateType} from "./types";

export interface IGate {
    id : string,
    x : number,
    y : number,
    width : number,
    height : number,
    rowIndex : number,
    colIndex : number,
    type: GateType
}

export interface IDraggableGate {
    id : string,
    x : number,
    y : number,
    dragStartPosition : ICoordinate
    width : number,
    height : number,
    rowIndex : number,
    colIndex : number,
    type: GateType
}

export interface ICircuitState {
    numQubits : number
}

export interface ICoordinate {
    x : number;
    y : number;
}

export interface IQASMRequestBody {
    script : string;
    count : number;
    state_vector : boolean;
}
