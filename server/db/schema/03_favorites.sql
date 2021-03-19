-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  imdb_id VARCHAR(255) NOT NULL
);
