import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { WhoIsApiService } from "./whois/whois.service";
import { StorageService } from "./storage/storage.service";
import { GetIpService } from "./getip.service";
import { DeleteIpService } from "./deleteip.service";
import { STORAGE_OPTION } from "./storage/storage-option";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const whoIsApiService = new WhoIsApiService()
const storageService = new StorageService(STORAGE_OPTION[process.env.STORAGE_OPTION || 'csv'])

app.get("/:ip", async (req: Request, res: Response) => {

  if (!req.params.ip) {
    res.send({
      success: false,
      message: "IP is missing"
    });
    return;
  }

  const ipData = await GetIpService.get(req.params.ip, storageService, whoIsApiService);

  res.send(ipData);
});

app.delete("/:ip", async (req: Request, res: Response) => {
  
  if (!req.params.ip) {
    res.send({
      success: false,
      message: "IP is missing"
    });
    return;
  }

  const result = await DeleteIpService.delete(req.params.ip, storageService)
  console.log(`Delete ${req.params.ip} - ${JSON.stringify(result)}`)
  res.send(result);
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});