import { container } from 'tsyringe';

import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<InterfaceMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);
