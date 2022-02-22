import { DeviceConnectionState } from "../redux/reducers/deviceConnectionReducer";
import {
    IBaseClass,
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
import {DIMENSIONS} from "./constants";

export class DeviceConnection implements DeviceConnectionState {
    connected: boolean;
    deviceName: string;
    constructor(connected : boolean, deviceName: string) {
        this.connected = connected;
        this.deviceName = deviceName;
    }
}

export class BaseClass implements IBaseClass {
    id : string;
    constructor() {
        this.id = v4();
    }
}


export class Gate extends BaseClass implements IGate {
    x: number;
    y: number;
    width: number;
    height: number;
    type: GateTypes;
    rotAngle? : string | null;
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
        gateExtension : IGateExtension,
        droppedFromMenu : boolean,
        rotAngle? : string | null,
    ) {
        super();
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
        var qasmGateScript : string;
        if (this.type === 'CNOT') {
            qasmGateScript = `cx`;
        } else if (this.rotAngle === null) {
            qasmGateScript = `${this.type.toLowerCase()}`;
        } else {
            qasmGateScript = `${this.type.toLowerCase()}(${this.rotAngle})`;
        }
        console.log("qasmGateScript=", qasmGateScript)
        return qasmGateScript;
    }
}


export class DraggableGate extends Gate implements IDraggableGate {
    dragStartPosition : ICoordinate;
    constructor(
        x: number,
        y: number,
        dragStartPosition : ICoordinate,
        width: number,
        height : number,
        qubitIds : string[],
        type: GateTypes,
        gateExtension : IGateExtension,
        droppedFromMenu : boolean,
        rotAngle? : string | null) {
        super(x, y, width, height,qubitIds, type,
            gateExtension, droppedFromMenu, rotAngle);
        this.dragStartPosition = dragStartPosition;
    }
}



export class GateExtension extends BaseClass implements IGateExtension {
    targetY : number;
    qubitId : string;
    type: GateExtTypes;

    constructor(
        targetY : number,
        qubitId : string,
        type: GateExtTypes) {
        super();
        this.targetY = targetY;
        this.qubitId = qubitId;
        this.type = type;
    }

}

export class Qubit extends BaseClass implements IQubit {
    y : number;
    size : number;
    qubitCells: IQubitCell[];

    constructor(size : number) {
        super();
        this.y = 0;
        this.size = size;
        const cols = Array.from(Array(size).keys());
        var tempQubitCells = [] as IQubitCell[];
        cols.map((col) => {
            tempQubitCells.push(new QubitCell(DIMENSIONS.GRID.WIDTH * col))
        })
        this.qubitCells = tempQubitCells;
    }
}

export class QubitCell extends BaseClass implements IQubitCell {
    x: number;

    constructor(x : number) {
        super();
        this.x = x;
    }
}

export class Modal extends BaseClass implements IModal {
    type : ModalType;
    state : ModalState;
    extras? : any;

    constructor(
        type : ModalType,
        state : ModalState,
        extras? : any
    ) {
        super();
        this.type = type;
        this.state = state;
        this.extras = extras;

    }
}

export class BuildOutput extends BaseClass implements IBuildOutput {
    name: string;
    outputData: number[][];
    runDuration: number;
    buildCircuitArrangement: string;

    constructor(name: string,
                outputData: number[][], runDuration: number,
                buildCircuitArrangement: string) {
        super();
        this.name = name;
        this.outputData = outputData;
        this.runDuration = runDuration;
        this.buildCircuitArrangement = buildCircuitArrangement;
    }
}
