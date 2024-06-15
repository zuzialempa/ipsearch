import { Result } from "./result.type";
import { StorageService } from "./storage/storage.service";
import { WhoIsApiService } from "./whois/whois.service";

export class GetIpService {
    static async get(ip: string, storageService: StorageService, whoIsApiService: WhoIsApiService): Promise<Result> {
        const item = await storageService.get(ip)
        if (item) {
            return {
                success: true,
                data: item
            }
        }

        const response = await whoIsApiService.getIpInformation(ip)

        if (response.success) {
            await storageService.save(ip, response.data)
        }
        return response
    }
}