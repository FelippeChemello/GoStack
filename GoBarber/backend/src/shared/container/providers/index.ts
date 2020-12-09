import { container } from 'tsyringe';

import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<InterfaceStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerInstance<InterfaceMailProvider>(
    'MailProvider',
    new EtherealMailProvider(),
);
