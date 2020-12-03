import { container } from 'tsyringe';

import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<InterfaceStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
