# Railway deployment - Dr.Job API

Deploy the **backend** (Node.js + Express) to [Railway](https://railway.com).

## 1. Push code to GitHub

```bash
git remote add origin https://github.com/luleztech/asilia.git
git branch -M main
git add .
git commit -m "Dr.Job: React Native app + Node.js API + PostgreSQL schema"
git push -u origin main
```

## 2. Create project on Railway

1. Go to [railway.com](https://railway.com) and sign in (GitHub).
2. **New Project** → **Deploy from GitHub repo**.
3. Select **luleztech/asilia** and authorize if asked.
4. **Important:** In the new service, open **Settings** → set **Root Directory** to **`backend`**. This makes Railway build only the Node API (otherwise it may detect the root Gemfile and fail with "No start command").
5. Alternatively, the repo includes **nixpacks.toml** and **Procfile** at root so that deploying from the repo root still builds and runs the backend (`backend/`).
6. Add **PostgreSQL**: In the same project, **New** → **Database** → **PostgreSQL**.
7. **Variables** for the API service: add **JWT_SECRET**; **DATABASE_URL** is usually auto-injected if PostgreSQL is in the same project.

## 3. Run database schema

After the first deploy, run the PostgreSQL schema against Railway’s database:

**Option A – Railway CLI**

```bash
npm i -g @railway/cli
railway login
railway link   # select your project + PostgreSQL service
railway run psql $DATABASE_URL -f backend/database/schema.sql
```

**Option B – From Railway dashboard**

- Open the PostgreSQL service → **Data** or **Connect**.
- Copy the connection string, then from your machine (with `psql` installed):

```bash
psql "postgresql://..." -f backend/database/schema.sql
```

Use the exact `DATABASE_URL` from Railway (host, user, password, database).

## 4. API URL for the mobile app

- In Railway, open the **backend** service → **Settings** → **Networking** → **Generate Domain**.
- Copy the URL (e.g. `https://asilia-production-xxxx.up.railway.app`).
- In the React Native app, set `API_BASE_URL` in `src/utils/constants.js` to this URL for production builds (no trailing slash).

## 5. Optional – CORS

The backend uses `cors()` with no origin restriction. For production you can restrict origins in `backend/server.js`:

```js
app.use(cors({ origin: ['https://your-app-domain.com'] }));
```

---

Summary: repo **[luleztech/asilia](https://github.com/luleztech/asilia)**; deploy the **backend** on Railway with **Root Directory** = `backend`, add **PostgreSQL** and **JWT_SECRET**, then run the schema once.
