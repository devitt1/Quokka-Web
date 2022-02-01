import {AxiosInstance} from "axios";
import {IGate, IQASMRequestBody} from "../common/interfaces";

class QsimAPIService {
    private readonly axios: AxiosInstance;

    constructor(axiosInstance : AxiosInstance) {
        this.axios = axiosInstance;
    }

    createQASMScript(numQubit : number, droppedGates : IGate[]) {
        return `OPENQASM 2.0;\nqreg[${numQubit}];\nncreg[${numQubit}];\nrx(pi) q[0];\nmeasure q -> c;`;
    }

    runQASMScript(script : string, runCount : number, stateVector : boolean) {
        const qasmRequestBody : IQASMRequestBody = {
            script : script,
            count : runCount,
            state_vector : stateVector
        }

        console.log('qasmRequestBody:', qasmRequestBody);

    }

}

export default QsimAPIService;
