import { pool } from './client';

const initSql = `
  CREATE TABLE IF NOT EXISTS _migrations (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    run_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
  INSERT INTO _migrations (name) VALUES ('init') ON CONFLICT (name) DO NOTHING;
`;

export const initDb = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query(initSql);
  } finally {
    client.release();
  }
};
