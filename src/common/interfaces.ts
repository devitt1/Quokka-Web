import {GateExtTypes, GateTypes, ModalState, ModalType} from "./types";

export interface IBaseInterface {
    id: string;
}

export interface IUser {
    id: string;
    email : string;
}


export interface IGate extends IBaseInterface{
    x : number,
    y : number,
    width : number,
    height : number,
    qubitIds : string[],
    type: GateTypes,
    gateExtension : IGateExtension;
    droppedFromMenu : boolean;
    rotAngle? : string | null;
    name? : string

}

export interface IDraggableGate extends IGate {
    dragStartPosition : ICoordinate
}

export interface IGateExtension {
    id: string,
    targetY: number,
    qubitId : string,
    type: GateExtTypes,
}


export interface IQubit {
    id: string;
    y: number;
    qubitCells : IQubitCell[];
    size : number
}

export interface IQubitCell {
    id : string;
    x : number
}

export interface ICircuitState {
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
    extras? : any;
}

export interface IBuildOutput {
    id: string;
    name: string;
    outputData : number[][];
    runDuration : number;
    buildCircuitArrangement : string;
}
