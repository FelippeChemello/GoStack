module.exports = [
    {
        name: 'default',
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
        migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
        cli: {
            migrationsDir: './src/shared/infra/typeorm/migrations',
        },
    },
    {
        name: 'mongo',
        type: 'mongodb',
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        database: process.env.MONGO_DATABASE,
        useUnifiedTopology: true,
        entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
    },
];
