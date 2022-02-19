import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";
import {
    IBuildOutput,
    ICoordinate,
    IDraggableGate,
    IGate,
    IGateExtension,
    IModal,
    IQubit,
    IQubitCell
} from "./interfaces";
import {GateExtTypes, GateTypes, ModalState, ModalType} from "./types";
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
    type: GateTypes;
    rotAngle : string;
    qubitIds : string[];
    gateExtension : IGateExtension;
    droppedFromMenu : boolean;

    constructor(
        x: number,
        y: number,
        width: number,
        height : number,
        qubitIds : string[],
        type: GateTypes,
        rotAngle : string,
        gateExtension : IGateExtension,
        droppedFromMenu : boolean,
        ) {
        this.id = v4();
       this.qubitIds = qubitIds;
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
       this.type = type;
       this.rotAngle = rotAngle;
       this.gateExtension = gateExtension
        this.droppedFromMenu = droppedFromMenu;
    }

    public toQASM () {
        const qasmGateScript = `${this.type.toLowerCase()}(${this.rotAngle})`;
        console.log("qasmGateScript=", qasmGateScript)
        return qasmGateScript;
    }
}

export class DraggableGate implements IDraggableGate {
    id : string;
    x: number;
    y: number;
    dragStartPosition : ICoordinate;
    width: number;
    height: number;
    qubitIds : string[];
    type: GateTypes;
    rotAngle : string;
    gateExtension : IGateExtension;
    droppedFromMenu : boolean;
    constructor(
        x: number,
        y: number,
        dragStartPosition : ICoordinate,
        width: number,
        height : number,
        qubitIds : string[],
        type: GateTypes,
        rotAngle : string,
        gateExtension : IGateExtension, droppedFromMenu : boolean) {
        this.id = v4();
        this.x = x;
        this.y = y;
        this.qubitIds = qubitIds;
        this.dragStartPosition = dragStartPosition;
        this.width = width;
        this.height = height;
        this.type = type;
        this.rotAngle = rotAngle;
        this.gateExtension = gateExtension;
        this.droppedFromMenu = droppedFromMenu;
    }
}

export class GateExtension implements IGateExtension {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    targetY : number;
    qubitId : string;
    type: GateExtTypes;

    constructor(x: number,
                y:number,
                width: number,
                height: number,
                targetY : number,
                qubitId : string,
                type: GateExtTypes
    ) {
        this.id = v4();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.targetY = targetY;
        this.qubitId = qubitId;
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

export class BuildOutput implements IBuildOutput {
    id: string;
    name: string;
    output: string;
    runDuration: number;
    buildCircuitArrangement: string;

    constructor(name: string,
                output: string, runDuration: number,
                buildCircuitArrangement: string) {
        this.id = v4();
        this.name = name;
        this.output = output;
        this.runDuration = runDuration;
        this.buildCircuitArrangement = buildCircuitArrangement;
    }
}
