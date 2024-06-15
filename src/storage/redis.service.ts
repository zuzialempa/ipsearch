import type { RedisClientType } from 'redis'
import { CACHE_EXPIRATION_S } from "../constants";
import { IpData } from "../whois/ip-data.type";
import { StorageInterface } from "./storage.interface";
import { createClient } from "@redis/client";

export class RedisService implements StorageInterface {
    redisClient: RedisClientType

    constructor() {
        this.initRedis()
    }
    private async initRedis () {
        this.redisClient = await createClient({ url: process.env.REDIS_CONNECTION_STRING })
        this.redisClient.on('error', err => console.log('Redis Client Error', err))
        this.redisClient.connect()
    }

    async save(ip: string, data: IpData): Promise<void> {
        // await this.redisClient.set(ip , JSON.stringify(data), {EX: CACHE_EXPIRATION_S})
        await this.redisClient.setEx(ip, CACHE_EXPIRATION_S, JSON.stringify(data))
    }

    async get(ip: string): Promise<IpData | null> {
        const item = await this.redisClient.get(ip)
        return item ? JSON.parse(item) as IpData :  null
    }

    async delete(ip: string): Promise<void> {
        await this.redisClient.del(ip)
    }
}