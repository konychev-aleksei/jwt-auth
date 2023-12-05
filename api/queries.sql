CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name NOT NULL VARCHAR(25) UNIQUE,
    password NOT NULL VARCHAR(60),
    role NOT NULL SMALLINT
);

CREATE TABLE refresh_sessions(
    id SERIAL PRIMARY KEY,
    user_id NOT NULL INT REFERENCES users(id) ON DELETE CASCADE,
    refresh_token NOT NULL VARCHAR(400),
    finger_print NOT NULL VARCHAR(32)  
);

SELECT * FROM users;
SELECT * FROM refresh_sessions;