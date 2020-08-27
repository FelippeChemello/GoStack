module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_URL || "localhost",
    "port": 5432,
    "username": process.env.DATABASE_USER || "postgres",
    "password": process.env.DATABASE_PASSWORD || "docker",
    "database": process.env.DATABASE_NAME || "gostack_gobarber",
    "entities": [
        "./src/models/*.ts"
    ],
    "migrations": [
        "./src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}
