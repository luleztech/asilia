# Dr.Job

**Dr.Job** is a Swahili health education and symptom-checker mobile app for users in Tanzania and East Africa. It helps users identify possible diseases from symptoms, learn about diseases, discover herbal remedies, watch health videos, listen to audio lessons, and get basic health guidance.

## Tech stack

- **Frontend:** React Native, NativeWind (TailwindCSS), React Navigation, Context API, AsyncStorage
- **Backend:** Node.js (Express) REST API, PostgreSQL, JWT authentication
- **Media:** Cloudinary (configure in backend for video/audio URLs)

## Project structure

```
Asilia/
├── App.js                    # App entry with providers & navigator
├── src/
│   ├── components/           # Header, SearchBar, DiseaseCard, HerbCard, VideoCard, AudioCard, SymptomButton, Loading, SectionTitle
│   ├── screens/              # Splash, Home, SearchSymptoms, SymptomsResult, Diseases, DiseaseDetail, Herbs, HerbDetail, Videos, Audios, Premium, Profile, Login, Register
│   ├── navigation/           # AppNavigator (tabs + stack)
│   ├── context/              # AuthContext, UserContext
│   ├── services/             # api.js (REST + cache)
│   ├── utils/                # constants, helpers
│   └── assets/
├── backend/
│   ├── server.js             # Express app (entry)
│   ├── db.js                 # PostgreSQL pool
│   ├── middleware/           # auth.js (JWT)
│   ├── package.json
│   ├── .env.example
│   └── database/
│       └── schema.sql        # PostgreSQL schema + seed data
├── package.json
├── tailwind.config.js
├── global.css
├── babel.config.js
└── metro.config.js
```

## How to run

### 1. Install dependencies

```bash
cd /home/ayoub/MySecretes/Asilia
npm install
```

### 2. Backend (Node.js + PostgreSQL)

- Create a PostgreSQL database and run the schema:

```bash
createdb drjob
psql -U postgres -d drjob -f backend/database/schema.sql
```

- Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` (e.g. `postgresql://user:password@localhost:5432/drjob`) and `JWT_SECRET`.

- Install and start the API:

```bash
cd backend
npm install
npm start
```

- For Android emulator, the app uses `http://10.0.2.2:8000` in dev. For a physical device, set `API_BASE_URL` in `src/utils/constants.js` to your machine’s LAN IP (e.g. `http://192.168.1.x:8000`).

### 3. Mobile app

```bash
npm start
```

In another terminal:

```bash
# Android
npm run android

# iOS (after pod install)
npm run ios
```

## API base URL

- **Dev (Android emulator):** `http://10.0.2.2:8000` (see `src/utils/constants.js`).
- **Production:** Set `API_BASE_URL` to your deployed API (e.g. `https://your-domain.com`). No `/api` prefix needed; the Node server serves at root.

## Main features

- **Splash** → Logo, then navigate to Home after 3 seconds.
- **Home** → Search symptoms (navigates to symptom checker), popular diseases, herbs, health videos, audio lessons, premium CTA.
- **Symptom checker** → Select/search symptoms → “Kagua magonjwa” → results by match score → open disease detail.
- **Diseases / Disease detail** → List and full description, symptoms, causes, hospital and herbal treatment.
- **Herbs / Herb detail** → List and benefits, usage.
- **Videos / Audios** → List and play (video/audio playback can be wired to Cloudinary URLs).
- **Premium** → Subscription info (e.g. 2,000 Tsh/month); payment integration can be added.
- **Profile** → Name, phone, subscription status, logout or login/register.
- **Auth** → Login and Register with JWT; token stored in AsyncStorage.

## Design

- Primary: green (health theme), background: light gray, cards: white with soft shadows.
- UI language: Swahili.
- Optimized for low-end Android and slower networks (caching, lazy loading).

## Security

- JWT for auth; parameterized queries (pg) to avoid SQL injection.
- Do not commit real `JWT_SECRET` or `DATABASE_URL`; use `.env` or a secrets manager in production.

## Ads (Google AdMob)

- AdMob is not integrated in this codebase. Add `react-native-google-mobile-ads` (or Expo config if you use Expo) and place banners/interstitials in the desired screens (e.g. Home, after symptom result).

## Production checklist

- [ ] Set production `API_BASE_URL`.
- [ ] Use strong `JWT_SECRET` and DB credentials via env.
- [ ] Host Node API (e.g. on Railway, Render, or a VPS with Node) and PostgreSQL.
- [ ] Upload media to Cloudinary and store URLs in `diseases`, `herbs`, `videos`, `audios`.
- [ ] Add AdMob app IDs and show ads where needed.
- [ ] Test on low-end devices and slow networks.
