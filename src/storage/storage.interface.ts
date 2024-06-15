import { IpData, IpDataResponse } from "../whois/ip-data.type";

export interface StorageInterface {
    save(ip: string, ipData: IpData, timeStamp: Date): Promise<void>;
    get(ip: string): Promise<IpData>;
    delete(ip: string): Promise<void>;
}