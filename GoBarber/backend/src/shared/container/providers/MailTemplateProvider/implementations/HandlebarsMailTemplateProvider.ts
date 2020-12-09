import handlebars from 'handlebars';

import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';
import InterfaceParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/InterfaceParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
    implements InterfaceMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: InterfaceParseMailTemplateDTO): Promise<string> {
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}
