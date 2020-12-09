import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';
import InterfaceSendMailDTO from '@shared/container/providers/MailProvider/dtos/InterfaceSendMailDTO';
import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements InterfaceMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: InterfaceMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: InterfaceSendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log(`Message send ${message.messageId}`);
        console.log(`Preview URL:  ${nodemailer.getTestMessageUrl(message)}`);
    }
}
