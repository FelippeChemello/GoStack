import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/container/providers/MailProvider/implementations/SESMailProvider';

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
};

container.registerInstance<InterfaceMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
);
