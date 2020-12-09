import { container } from 'tsyringe';

import InterfaceStorageProvider from '@shared/container/providers/StorageProvider/models/InterfaceStorageProvider';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';

import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<InterfaceStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<InterfaceMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<InterfaceMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
