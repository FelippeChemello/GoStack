import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';

export default class FakeMailTemplateProvider
    implements InterfaceMailTemplateProvider {
    public async parse(): Promise<string> {
        return 'Mail Content';
    }
}
