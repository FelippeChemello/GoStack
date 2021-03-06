import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import InterfaceAppointmentsRepository from '@modules/appointments/repositories/InterfaceAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import InterfaceUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import InterfaceNotificationsRepository from '@modules/notifications/repositories/InterfaceNotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<InterfaceAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<InterfaceUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<InterfaceUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<InterfaceNotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);
