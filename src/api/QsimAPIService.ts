import {AxiosInstance} from "axios";
import {ICircuitState, IGate, IQASMRequestBody, IQubit} from "../common/interfaces";

class QsimAPIService {
    private readonly axios: AxiosInstance;

    constructor(axiosInstance : AxiosInstance) {
        this.axios = axiosInstance;
    }

    createQASMScript(qubits : IQubit[], droppedGates : IGate[]) {

        let qasmGatesScript = "";
        droppedGates.forEach((droppedGate) => {
            qasmGatesScript += this.createQASMGateScript(qubits, droppedGate)

        });
        return `OPENQASM 2.0;\n
        qreg q[${qubits.length}];
        \ncreg c[${qubits.length}];
        ${qasmGatesScript}
        \nmeasure q -> c;`;
    }



    createQASMGateScript = (qubits : IQubit[], gate : IGate) => {
        var qasmGateScript = "";
        // if (gate.qubitIds.length === 1) {
        qasmGateScript = `\nr${gate.type.toLowerCase()}(pi) q[${this.findQubitIndex(gate.qubitIds[0], qubits)}];`;
        // }
        console.log("qasmGateScript=", qasmGateScript)
        return qasmGateScript;
    }


    getQubitById = (id: string, qubits : IQubit[]) => {
        return qubits.find(qubit => qubit.id === id);
    }

    findQubitIndex = (id: string, qubits : IQubit[]) => {
        const index = qubits.findIndex((qubit) => {
            return qubit.id === id;
        });
        return index;
    }

    async runQASMScript(script : string, runCount : number, stateVector : boolean) {
        const qasmRequestBody : IQASMRequestBody = {
            script : script as string,
            count : runCount as number,
            state_vector : stateVector as boolean,
        }

        console.log('qasmRequestBody:', JSON.stringify(qasmRequestBody));
        return await this.sendQASMRequest(qasmRequestBody);
    }

    async sendQASMRequest(qasmRequestBody : IQASMRequestBody) {
        try {
            return this.axios.post(`/qsim/qasm`, qasmRequestBody);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

}

export default QsimAPIService;
