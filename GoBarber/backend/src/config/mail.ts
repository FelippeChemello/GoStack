interface InterfaceMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'felippe@codestack.me',
            name: 'Felippe da CodeStack',
        },
    },
} as InterfaceMailConfig;
