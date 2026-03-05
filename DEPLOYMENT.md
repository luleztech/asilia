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
4. After the repo is linked, add a **service** for the API:
   - **Add Service** → **GitHub Repo** → choose **luleztech/asilia**.
   - In the new service, open **Settings**:
     - **Root Directory**: set to `backend` (so Railway builds and runs only the Node API).
     - **Build Command**: leave default (`npm install`).
     - **Start Command**: leave default (`npm start`) or set `node server.js`.
5. Add **PostgreSQL**:
   - In the same project, click **New** → **Database** → **PostgreSQL**.
   - Railway creates a Postgres instance and exposes `DATABASE_URL`.
6. **Variables** for the API service:
   - Open the **backend** service → **Variables**.
   - Add or confirm:
     - `DATABASE_URL` – copy from the PostgreSQL service (Railway often injects this automatically if in same project).
     - `JWT_SECRET` – set a long random string (e.g. from `openssl rand -hex 32`).
   - Railway sets `PORT`; the app uses `process.env.PORT`, so no need to set it.
7. **Deploy**: Railway builds and deploys on every push to `main`. First run the DB schema once (see below).

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
