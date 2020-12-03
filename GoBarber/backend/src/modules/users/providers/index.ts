import { container } from 'tsyringe';

import InterfaceHashProvider from '@modules/users/providers/HashProvider/models/InterfaceHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<InterfaceHashProvider>(
    'HashProvider',
    BCryptHashProvider,
);
