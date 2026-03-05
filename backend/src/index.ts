import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { initDb } from './db';
import routes from './routes';

const app = express();
let port = Number(process.env.PORT) || 5001;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const start = async (): Promise<void> => {
  try {
    await initDb();
    console.log('Database ready');
  } catch (err) {
    console.error('Database init failed:', err);
    console.error('Ensure PostgreSQL is running and the database exists (e.g. createdb ai_menu)');
    process.exit(1);
  }

  const tryListen = (p: number): void => {
    const server = app.listen(p, () => {
      console.log(`Server running at http://localhost:${p}`);
    });
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${p} is in use, trying ${p + 1}...`);
        tryListen(p + 1);
      } else {
        throw err;
      }
    });
  };

  tryListen(port);
};

start();


