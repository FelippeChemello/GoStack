export default {
    jwt: {
        secret: process.env.GOBARBER_APP_SECRET,
        expiresIn: '1d',
    },
};
