CREATE DATABASE usersoflogin;

CREATE TABLE loguser(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(15)UNIQUE NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  user_role VARCHAR(10) DEFAULT 'USER'
);

CREATE TABLE article(
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  local_image_path VARCHAR(255),
  option INT NOT NULL,
  labels VARCHAR(255)[] NOT NULL,  -- Array of strings, max length of 10 elements
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Adding the constraint to limit the `option` array size to 10
ALTER TABLE article
  ADD CONSTRAINT option_array_limit CHECK (array_length(labels, 1) <= 10);

CREATE TABLE questionnaire (
    questionnaire_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES loguser(user_id) ON DELETE CASCADE, -- Foreign key referencing loguser
    selectedPreferences TEXT[],    -- Array of selected preferences
    selectedplace VARCHAR(100),                 -- Array of keywords (destinations)
    selectedPurpose VARCHAR(50),    -- Purpose of the trip
    selectedEndurance VARCHAR(50),  -- Endurance level
    startDate DATE,                 -- Start date of the trip
    endDate DATE,                   -- End date of the trip
    budget INT                       -- Budget for the trip
);