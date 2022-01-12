import axios from "axios";
import CircuitBuilderAPIService from "./CircuitBuilderAPIService";
import QsimAPIService from "./QsimAPIService";

class APIClient {
    public readonly circuitBuilderAPIService : CircuitBuilderAPIService;
    public readonly qsimAPIService : QsimAPIService;
    private readonly DEVELOPMENT_BASE_URL = "http://localhost:8080";
    private readonly QSIM_API_NGROK_URL = `https://${window.sessionStorage.getItem('deviceName')}.ngrok.io`;
    // private readonly PRODUCTION_BASE_URL = "https://tphoportfolioapi.azurewebsites.net"
    constructor() {
        const circuitBuilderAPIAxiosInstance = axios.create({
            baseURL: this.DEVELOPMENT_BASE_URL,
        });
        const qsimAPIAxiosInstance = axios.create({
            baseURL: this.QSIM_API_NGROK_URL
        })
        this.circuitBuilderAPIService = new CircuitBuilderAPIService(circuitBuilderAPIAxiosInstance);
        this.qsimAPIService = new QsimAPIService(qsimAPIAxiosInstance);
    }
}

export default APIClient;
