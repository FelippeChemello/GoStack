import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface InterfaceRequestDTO {
    email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: InterfaceUsersRepository,

        @inject('MailProvider')
        private mailProvider: InterfaceMailProvider,
    ) {}

    public async execute({ email }: InterfaceRequestDTO): Promise<void> {
        this.mailProvider.sendMail(
            email,
            'Solicitação de recuperação de senha.',
        );
    }
}
