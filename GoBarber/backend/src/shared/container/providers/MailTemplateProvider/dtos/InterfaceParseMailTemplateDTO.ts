interface InterfaceTemplateVariables {
    [key: string]: string | number;
}

export default interface InterfaceParseMailTemplateDTO {
    file: string;
    variables: InterfaceTemplateVariables;
}
