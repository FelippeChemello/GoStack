import InterfaceMailProvider from '@shared/container/providers/MailProvider/models/InterfaceMailProvider';

interface InterfaceMessage {
    to: string;
    body: string;
}

export default class FakeMailProvider implements InterfaceMailProvider {
    private messages: InterfaceMessage[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body,
        });
    }
}
