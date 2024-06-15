import { CACHE_EXPIRATION_MS } from "../constants";
import { IpData, IpDataResponse } from "../whois/ip-data.type";
import { StorageInterface } from "./storage.interface";
import { promises } from "fs"

export class CSVService implements StorageInterface {
    fileName: string

    constructor(fileName: string) {
        this.fileName = fileName
    }

    async save(ip: string, data: IpData): Promise<void> {
        const csvString = `${ip};${(new Date()).toISOString()};${JSON.stringify(data)}\n`
        await promises.appendFile(this.fileName, csvString);

        // auto deletion after 60s
        setTimeout(async () => {
            console.log('Deleted - ', ip)
            await this.delete(ip)
        }, CACHE_EXPIRATION_MS)
    }

    async get(ip: string): Promise<IpData | null> {
        const data = await promises.readFile(this.fileName);
        const rows = data.toString().split('\n').map(row => row.split(';'))
        const item = rows.find(row => row[0] === ip)
        if (!item) {
            return null
        }
        return JSON.parse(item[2]) as IpData
    }

    async delete(ip: string): Promise<void> {
        const data = await promises.readFile(this.fileName);
        const rows = data.toString().split('\n').map(row => row.split(';'))
        const newData = rows.filter(row => row[0] !== ip).map(row => row.join(';')).join('\n')
        await promises.writeFile(this.fileName, newData);
    }
}