CREATE DATABASE usersoflogin;

CREATE TABLE loguser(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(15)UNIQUE NOT NULL,
  user_password VARCHAR(15) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL
);