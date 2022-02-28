import {IGate, IQubit} from "./interfaces";

export const sleep = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const findQubitIndex = (id: string, qubits : IQubit[]) => {
    const index = qubits.findIndex((qubit) => {
        return qubit.id === id;
    });
    return index;
}

export const gateToQASM = (gate : IGate) => {
    var qasmGateScript : string;
    if (gate.type === 'CNOT') {
        qasmGateScript = `cx`;
    } else if (gate.rotAngle === null) {
        qasmGateScript = `${gate.type.toLowerCase()}`;
    } else {
        qasmGateScript = `${gate.type.toLowerCase()}(${gate.rotAngle})`;
    }
    console.log("qasmGateScript=", qasmGateScript)
    return qasmGateScript;
}
