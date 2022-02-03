import {AxiosInstance} from "axios";
import {IGate, IQASMRequestBody} from "../common/interfaces";

class QsimAPIService {
    private readonly axios: AxiosInstance;

    constructor(axiosInstance : AxiosInstance) {
        this.axios = axiosInstance;
    }

    createQASMScript(numQubit : number, droppedGates : IGate[]) {
        return `OPENQASM 2.0;\nqreg q[${numQubit}];\ncreg c[${numQubit}];\nrx(pi) q[0];\nmeasure q -> c;`;
    }

    async runQASMScript(script : string, runCount : number, stateVector : boolean) {
        const qasmRequestBody : IQASMRequestBody = {
            script : script as string,
            count : runCount as number,
            state_vector : stateVector as boolean,
        }

        console.log('qasmRequestBody:', JSON.stringify(qasmRequestBody));
        const response = await this.sendQASMRequest(qasmRequestBody);
        return response;
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
