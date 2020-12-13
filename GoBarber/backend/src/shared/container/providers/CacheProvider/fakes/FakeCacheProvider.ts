import cacheConfig from '@config/cache';

import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

interface InterfaceCacheData {
    [key: string]: string;
}

export default class FakeCacheProvider implements InterfaceCacheProvider {
    private cache: InterfaceCacheData = {};

    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cache[key];

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        Object.entries(this.cache).forEach(([key, value]) => {
            if (key.match(new RegExp(`${prefix}:.*`))) {
                delete this.cache[key];
            }
        });
    }
}
