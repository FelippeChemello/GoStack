import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';
import InterfaceParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/InterfaceParseMailTemplateDTO';

export default class FakeMailTemplateProvider
    implements InterfaceMailTemplateProvider {
    public async parse({
        template,
    }: InterfaceParseMailTemplateDTO): Promise<string> {
        return template;
    }
}
