import { container } from 'tsyringe';

import InterfaceCacheProvider from '@shared/container/providers/CacheProvider/models/InterfaceCacheProvider';

import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<InterfaceCacheProvider>(
    'CacheProvider',
    RedisCacheProvider,
);
