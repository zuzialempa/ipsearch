import axios from "axios";
import { IpData } from "./ip-data.type";
import { Result } from "../result.type";

export class WhoIsApiService {
    private axiosInstance: axios.AxiosInstance

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://ipwho.is',
        });
    }

    async getIpInformation(ip: string): Promise<Result> {
        try {
            const response = await this.axiosInstance.get(`/${ip}`)
            console.log('called whois api for', ip)
            if (response.data.success) {
                return { success: true, data: response.data }
            } 
            return { success: false, message: response.data ? response.data.message : '' } as Result
        } catch (err) {
            console.log('Error happen', err.message)
            return { success: false, message: err.message }
        }
    }
}