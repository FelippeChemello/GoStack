export default {
    jwt: {
        secret: process.env.JWT_SECRET || '7bfc04921ff6b3b5c5a319a5c9aba1e9',
        expiresIn: '1d',
    },
};
