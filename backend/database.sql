CREATE DATABASE usersoflogin;

CREATE TABLE loguser(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(15)UNIQUE NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  user_role VARCHAR(10) DEFAULT 'USER'
);