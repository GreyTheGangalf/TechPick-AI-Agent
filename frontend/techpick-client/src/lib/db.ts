import { Pool } from "pg";

const globalForPg = globalThis as unknown as {
    pool: Pool | undefined;
};

export const pool = globalForPg.pool ?? new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
});

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool;