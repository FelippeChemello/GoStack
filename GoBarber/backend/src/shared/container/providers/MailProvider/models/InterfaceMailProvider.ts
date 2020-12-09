import InterfaceSendMailDTO from '@shared/container/providers/MailProvider/dtos/InterfaceSendMailDTO';

export default interface InterfaceMailProvider {
    sendMail(data: InterfaceSendMailDTO): Promise<void>;
}
