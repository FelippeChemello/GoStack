import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

export default class RedisCacheProvider implements InterfaceCacheProvider {
    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }

    public async recover(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    public async invalidate(key: string): Promise<void> {}
}
