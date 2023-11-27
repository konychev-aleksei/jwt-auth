CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    password VARCHAR(100),
    role SMALLINT
);

CREATE TABLE refresh_session(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES user(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(400) NOT NULL 
);

DROP TABLE user CASCADE;
DROP TABLE refresh_session;

SELECT * FROM user;
SELECT * FROM refresh_session;