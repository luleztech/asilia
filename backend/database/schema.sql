-- Dr.Job - PostgreSQL schema
-- Run: psql -U postgres -d drjob -f schema.sql  (or create db first: createdb drjob)

-- diseases
CREATE TABLE IF NOT EXISTS diseases (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  symptoms TEXT,
  causes TEXT,
  treatment TEXT,
  herbal_treatment TEXT,
  video_url VARCHAR(512),
  audio_url VARCHAR(512),
  image VARCHAR(512),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_diseases_name ON diseases (name);

-- herbs
CREATE TABLE IF NOT EXISTS herbs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  benefits TEXT,
  usage_method TEXT,
  image VARCHAR(512),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_herbs_name ON herbs (name);

-- symptoms
CREATE TABLE IF NOT EXISTS symptoms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_symptoms_name ON symptoms (name);

-- disease_symptoms (many-to-many)
CREATE TABLE IF NOT EXISTS disease_symptoms (
  id SERIAL PRIMARY KEY,
  disease_id INT NOT NULL REFERENCES diseases(id) ON DELETE CASCADE,
  symptom_id INT NOT NULL REFERENCES symptoms(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(disease_id, symptom_id)
);
CREATE INDEX IF NOT EXISTS idx_disease_symptoms_disease ON disease_symptoms (disease_id);
CREATE INDEX IF NOT EXISTS idx_disease_symptoms_symptom ON disease_symptoms (symptom_id);

-- videos
CREATE TABLE IF NOT EXISTS videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(512) NOT NULL,
  thumbnail VARCHAR(512),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- audios
CREATE TABLE IF NOT EXISTS audios (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  audio_url VARCHAR(512) NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  subscription_status VARCHAR(20) DEFAULT 'inactive' CHECK (subscription_status IN ('inactive', 'active')),
  subscription_ends_at DATE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users (phone);

-- updated_at trigger helper (optional)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Seed sample data (safe to run multiple times)
INSERT INTO symptoms (name) VALUES
  ('Homa'),
  ('Kichwa'),
  ('Kukohoa'),
  ('Kutapika'),
  ('Maumivu ya tumbo')
ON CONFLICT (name) DO NOTHING;

-- Use ON CONFLICT only if you have a unique constraint on name; otherwise skip duplicates by not using ON CONFLICT and running once
INSERT INTO diseases (name, description, symptoms, causes, treatment, herbal_treatment)
SELECT 'Malaria', 'Ugonjwa unaosababishwa na protozoa ya Plasmodium.', 'Homa, kichwa, mwili kuumwa.', 'Mbu wenye virusi.', 'Dawa za kinza-malaria, mapumziko.', 'Moringa, tumeric.'
WHERE NOT EXISTS (SELECT 1 FROM diseases WHERE name = 'Malaria' LIMIT 1);

INSERT INTO herbs (name, benefits, usage_method)
SELECT 'Moringa', 'Virutubisho, kinga mwili.', 'Chumvi ya majani au chai.'
WHERE NOT EXISTS (SELECT 1 FROM herbs WHERE name = 'Moringa' LIMIT 1);

INSERT INTO herbs (name, benefits, usage_method)
SELECT 'Tangawizi', 'Kupunguza maumivu, homa.', 'Chai ya tangawizi.'
WHERE NOT EXISTS (SELECT 1 FROM herbs WHERE name = 'Tangawizi' LIMIT 1);

-- Link Malaria to symptoms for symptom-check
INSERT INTO disease_symptoms (disease_id, symptom_id)
SELECT d.id, s.id FROM diseases d, symptoms s
WHERE d.name = 'Malaria' AND s.name IN ('Homa', 'Kichwa', 'Kukohoa', 'Maumivu ya tumbo')
ON CONFLICT (disease_id, symptom_id) DO NOTHING;
