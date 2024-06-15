import { CSVService } from "./csv.service";
import { RedisService } from "./redis.service";

export const STORAGE_OPTION = {
    csv: new CSVService("./data/mycacheinfile.csv"),
    redis: new RedisService()
}