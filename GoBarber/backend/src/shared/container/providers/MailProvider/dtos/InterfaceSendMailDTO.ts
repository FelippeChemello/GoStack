import InterfaceParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/InterfaceParseMailTemplateDTO';

interface InterfaceMailContact {
    name: string;
    email: string;
}

export default interface InterfaceSendMailDTO {
    to: InterfaceMailContact;
    from?: InterfaceMailContact;
    subject: string;
    templateData: InterfaceParseMailTemplateDTO;
}
