import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import InterfaceUsersRepository from '@modules/users/repositories/InterfaceUsersRepository';
import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';
import InterfaceUserTokensRepository from '@modules/users/repositories/InterfaceUserTokensRepository';

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

        @inject('UserTokensRepository')
        private userTokensRepository: InterfaceUserTokensRepository,
    ) {}

    public async execute({ email }: InterfaceRequestDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData: {
                file: path.resolve(
                    __dirname,
                    '..',
                    'views',
                    'forgot_password.hbs',
                ),
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }
}
