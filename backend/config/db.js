import pg from 'pg';

export const pool = new pg.Pool({
    user: process.env.PG_DB_USER,
    host: process.env.PG_DB_HOST,
    password: process.env.PG_DB_PASSWORD,
    database: process.env.PG_DB,
    port: process.env.PG_DB_PORT
});

