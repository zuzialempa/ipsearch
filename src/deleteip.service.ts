import { Result } from "./result.type";
import { StorageService } from "./storage/storage.service";

export class DeleteIpService {
    static async delete (ip: string, storageService: StorageService): Promise<Result> {
      const item = await storageService.get(ip)
      
      if (item) {
        await storageService.delete(ip)
        return { success: true };
      }
    
      return { success: false, message: "Item doeasn't exists." };
    }
}