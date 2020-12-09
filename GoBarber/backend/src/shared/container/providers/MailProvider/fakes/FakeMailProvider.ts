import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';
import InterfaceSendMailDTO from '@shared/container/providers/MailProvider/dtos/InterfaceSendMailDTO';

export default class FakeMailProvider implements InterfaceMailProvider {
    private messages: InterfaceSendMailDTO[] = [];

    public async sendMail(message: InterfaceSendMailDTO): Promise<void> {
        this.messages.push(message);
    }
}
