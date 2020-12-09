interface InterfaceTemplateVariables {
    [key: string]: string | number;
}

export default interface InterfaceParseMailTemplateDTO {
    template: string;
    variables: InterfaceTemplateVariables;
}
