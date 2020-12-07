export default interface InterfaceMailProvider {
    sendMail(to: string, body: string): Promise<void>;
}
