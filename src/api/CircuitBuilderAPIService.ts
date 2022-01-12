import { AxiosInstance } from "axios";

class CircuitBuilderAPIService {
    private readonly axios: AxiosInstance;

    constructor (axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    public async getDeviceConnectionStatus(deviceName : string) {
        try {
            return this.axios.get<boolean>(`/devices/connection/${deviceName}`);
        }
        catch (e) {
            console.log(e);
            throw e;
        }

    }
}

export default CircuitBuilderAPIService;
