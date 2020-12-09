import InterfaceParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/InterfaceParseMailTemplateDTO';

export default interface InterfaceMailTemplateProvider {
    parse(data: InterfaceParseMailTemplateDTO): Promise<string>;
}
