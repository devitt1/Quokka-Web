import {IQubit} from "./interfaces";

export const sleep = (ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const findQubitIndex = (id: string, qubits : IQubit[]) => {
    const index = qubits.findIndex((qubit) => {
        return qubit.id === id;
    });
    return index;
}
