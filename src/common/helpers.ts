import {IGate, IQubit} from "./interfaces";
import {SelectionBoxState} from "../components/Providers/CompoundGateSelectionContextProvider";

export const sleep = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const findQubitIndex = (id: string, qubits : IQubit[]) => {
    const index = qubits.findIndex((qubit) => {
        return qubit.id === id;
    });
    return index;
}

export const findQubitFromId = (id: string, qubits : IQubit[]) : IQubit | null => {
    const qubit = qubits.find((qubit) => {
        return qubit.id === id;
    });
    if (qubit) {
        return qubit;
    } else {
        return null;
    }
}

export const gateToQASM = (gate : IGate) => {
    var qasmGateScript : string;
    if (gate.type === 'CNOT') {
        qasmGateScript = `cx`;
    } else if (gate.rotAngle === null) {
        qasmGateScript = `${gate.type.toLowerCase()}`;
    } else if (gate.rotAngle) {
        qasmGateScript = `${gate.type.toLowerCase()}(${gate.rotAngle})`;
    } else if (gate.type === 'H') {
        qasmGateScript = `${gate.type.toLowerCase()}`;
    } else if (gate.type === 'Measurement Gate') {
        qasmGateScript = `measure`;
    } else {
        qasmGateScript = `undefined`;
    }
    console.log("qasmGateScript=", qasmGateScript)
    return qasmGateScript;
}

export const locateGatesInSelectionBox = (selectionBox : SelectionBoxState, droppedGates : IGate[]) : IGate[]=> {
    var result : IGate[] = [] as IGate[];
    const box = {left: selectionBox.mouseStartPosition.x,
        top: selectionBox.mouseStartPosition.y,
        right: selectionBox.mouseStartPosition.x + selectionBox.dimension.width,
        bottom: selectionBox.mouseStartPosition.y + selectionBox.dimension.height};

    droppedGates.forEach((gate, indexx) => {
        const gatePosition = {left: gate.x,
            top: gate.y,
            right: gate.x + gate.width,
            bottom: gate.y + gate.height}
        if (gatePosition.left > box.left
            && gatePosition.right < box.right
            && gatePosition.top > box.top
            && gatePosition.bottom < box.bottom) {
            result.push(gate);
        }
    });


    console.log("box: ", box);
    return result;
}

/**
 * Find the furthest top left gate in an array of gates
 * Condition:
 * #1 priority: gate is furthest to the left
 * #2 priority: gate is furthest to the top
 * @param droppedGates
 */
export const findFurthestTopLeftGateInArray = (droppedGates : IGate[]) : {x: number, y: number} => {
    var furthestLeft = droppedGates[0].x;
    var furthestTop = droppedGates[0].y;

    droppedGates.forEach((gate, index) => {
        if (gate.x < furthestLeft) {
            furthestLeft = gate.x;
        }
        if (gate.y < furthestTop) {
            furthestTop = gate.y;
        }
    });
    console.log(`furthest left: ${furthestLeft}, furthest top: ${furthestTop}`);
    return {x: furthestLeft, y: furthestTop};
}

export const countGatesHorizontally = (droppedGates : IGate[], yPos : number) => {
    return  droppedGates.filter((gate) => gate.y === yPos).length;
}

export const countGatesVertically = (droppedGates : IGate[], xPos : number) => {
    return  droppedGates.filter((gate) => gate.x === xPos).length;
}

export const getMaxGatesHorizontally = (gatesInSelection : IGate[], droppedGates : IGate[]) => {
    var countArr : number[] = [] as number[];
    gatesInSelection.forEach((gate, index) => {
        // console.log(`count horizontally: ${countGatesHorizontally(droppedGates, gate.y)}`)
        countArr.push(countGatesHorizontally(droppedGates, gate.y));
    })
    return Math.max(...countArr);
}

export const getMaxGatesVertically = (gatesInSelection : IGate[], droppedGates : IGate[]) => {
    var countArr : number[] = [] as number[];
    gatesInSelection.forEach((gate, index) => {
        // console.log(`count horizontally: ${countGatesHorizontally(droppedGates, gate.y)}`)
        countArr.push(countGatesVertically(droppedGates, gate.x));
    })
    return Math.max(...countArr);
}

export const formattedDate = (date?: Date) => {
    if (date) {
        return date.toString().replaceAll('-', '/');
    }
    else {
        return 'undefined'
    }
}
