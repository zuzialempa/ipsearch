import { IpData } from "./whois/ip-data.type"

export type Result = {
    success: boolean,
    message?: string,
    data?: IpData
}