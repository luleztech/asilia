# Dr.Job API (Node.js + PostgreSQL)

REST API for the Dr.Job mobile app. Same endpoints as before; backend is Node.js with Express and PostgreSQL.

## Setup

1. **Create database**
   ```bash
   createdb drjob
   # or: psql -U postgres -c "CREATE DATABASE drjob;"
   ```

2. **Run schema and seed**
   ```bash
   psql -U postgres -d drjob -f database/schema.sql
   # Or: DATABASE_URL=postgresql://user:pass@localhost:5432/drjob psql $DATABASE_URL -f database/schema.sql
   ```

3. **Environment**
   - Copy `.env.example` to `.env` and set:
     - `PORT` – server port (default 8000)
     - `DATABASE_URL` – PostgreSQL connection string, e.g. `postgresql://user:password@localhost:5432/drjob`
     - `JWT_SECRET` – secret for JWT (change in production)

4. **Install and run**
   ```bash
   npm install
   npm start
   # Or dev with auto-reload:
   npm run dev
   ```

Server listens on `http://0.0.0.0:8000`. For the React Native app, use `http://10.0.2.2:8000` (Android emulator) or your machine’s IP for a physical device.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /diseases | List diseases |
| GET | /disease/:id | Disease detail |
| GET | /herbs | List herbs |
| GET | /herb/:id | Herb detail |
| GET | /symptoms | List symptoms |
| POST | /symptom-check | Body: `{"symptom_ids": [1,2,3]}` |
| GET | /videos | List videos |
| GET | /audios | List audios |
| POST | /register | Body: `{"name","phone","password"}` |
| POST | /login | Body: `{"phone","password"}` |

All responses are JSON.
