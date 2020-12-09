import handlebars from 'handlebars';
import fs from 'fs';

import InterfaceMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/InterfaceMailTemplateProvider';
import InterfaceParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/InterfaceParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
    implements InterfaceMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: InterfaceParseMailTemplateDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}
