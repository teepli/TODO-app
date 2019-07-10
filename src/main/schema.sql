DROP TABLE IF EXISTS todo;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    topic text NOT NULL,
    description text,
    duedate date,
    finished boolean DEFAULT false
);
