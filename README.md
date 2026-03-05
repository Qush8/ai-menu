# AI Menu — Full-Stack Monorepo

React (Vite) + Express monorepo with TypeScript, MUI, and Axios.

## Structure

- **frontend/** — Vite + React + TypeScript, Material UI, Axios
- **backend/** — Express + TypeScript, clean layout (controllers, routes, models)

## Setup

```bash
# Install all dependencies (root + backend + frontend)
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

**Backend:** Copy env example and optionally adjust port and database:

```bash
cp backend/.env.example backend/.env
```

### PostgreSQL

Backend uses PostgreSQL. Use a **separate database** for this project (e.g. `ai_menu`), not the one from your other project.

#### New database in Beekeeper Studio

1. Open Beekeeper Studio and connect to your PostgreSQL server (localhost or remote).
2. **New database:** Right-click the connection (or use the menu) → **Create database** / **New database**.
3. Name it e.g. **`ai_menu`** → Create.
4. The new empty database will appear in the sidebar. The app will create the `_migrations` table on first run.

Then set `backend/.env` (copy from `.env.example`):

- **Option A** — separate vars: set `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB=ai_menu` (and `POSTGRES_HOST`/`POSTGRES_PORT` if not localhost:5432).
- **Option B** — one URL:  
  `DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/ai_menu`  
  (replace USER and PASSWORD with the same values you use in Beekeeper).

After that, run `npm run dev:backend` — the app will connect to the new DB and create the initial schema.

#### Alternative: terminal

```bash
createdb ai_menu
# or
psql -U postgres -c "CREATE DATABASE ai_menu;"
```

Set `backend/.env` as above. On startup, the app creates the `_migrations` table if missing.

## Run

From the repo root:

```bash
npm run dev
```

- **Frontend:** http://localhost:5173  
- **Backend API:** http://localhost:5001  

The frontend proxies `/api` to the backend. The home page fetches `GET /api/hello` and displays the response (“Hello World”) to confirm the connection.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Run frontend and backend together |
| `npm run dev:frontend` | Run only Vite dev server |
| `npm run dev:backend` | Run only Express with nodemon |
| `npm run build --prefix backend` | Build backend TypeScript to `backend/dist` |
| `npm run build --prefix frontend` | Build frontend for production |

## If nodemon fails with “too many open files”

On macOS you may need to raise the file descriptor limit:

```bash
ulimit -n 10240
```

Then run `npm run dev` again.
