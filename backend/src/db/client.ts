import { Pool, PoolConfig } from 'pg';

const getConfig = (): PoolConfig => {
  if (process.env.DATABASE_URL) {
    return { connectionString: process.env.DATABASE_URL };
  }
  return {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DB ?? 'ai_menu',
  };
};

export const pool = new Pool(getConfig());

export const query = pool.query.bind(pool);
