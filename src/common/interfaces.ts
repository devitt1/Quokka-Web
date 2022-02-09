import {GateTypes, ModalState, ModalType} from "./types";

export interface IGate {
    id : string,
    x : number,
    y : number,
    width : number,
    height : number,
    rowIndex : number,
    colIndex : number,
    qubitIds : string[],
    type: GateTypes
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
    qubitIds : string[],
    type: GateTypes
}

export interface IQubit {
    id: string;
    qubitCells : IQubitCell[];
    size : number
}

export interface IQubitCell {
    id : string;
    x : number
}

export interface ICircuitState {
    numQubits : number,
    qubits : IQubit[],
    droppedGates : IGate[],
    draggingGate : IDraggableGate,
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

export interface IModal {
    id : string;
    type: ModalType;
    state : ModalState;
}

export interface IBuildOutput {
    id: string;
    name: string;
    output : string;
    runDuration : number;
    buildCircuitArrangement : string;
}
