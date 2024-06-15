import { IpData, IpDataResponse } from "../whois/ip-data.type";
import { StorageInterface } from "./storage.interface";

export class StorageService {
    storage: StorageInterface;

    constructor (storageVersion: StorageInterface) {
        this.storage = storageVersion
    }

    async save(ip: string, data: IpData): Promise<void> {
        const itemInStorage = await this.storage.get(ip)
        console.log(`Saved ${ip}`)
        
        if (!itemInStorage) {
            await this.storage.save(ip, data, new Date())
        }
    }

    async get(ip: string): Promise<IpData> {
        console.log(`Get ${ip}`)
        return await this.storage.get(ip)
    }

    async delete(ip: string): Promise<void> {
        await this.storage.delete(ip)
    }
}