import {AxiosInstance} from "axios";

class QsimAPIService {
    private readonly axios: AxiosInstance;

    constructor(axiosInstance : AxiosInstance) {
        this.axios = axiosInstance;
    }
}

export default QsimAPIService;
