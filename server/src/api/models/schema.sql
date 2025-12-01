CREATE TABLE users (
    user_id SERIAL,
    user_email VARCHAR(30),
    user_name VARCHAR(15),
    hashed_user_password text,
    PRIMARY KEY(user_id)
);
CREATE TABLE tasks (
    task_id SERIAL,
    user_id INTEGER,
    scope text,
    tittle VARCHAR(25),
    description text,
    start_time TIMESTAMP,
    end_time INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    PRIMARY KEY(task_id)
);
INSERT INTO users (user_email,user_name,hashed_user_password) VALUES(
    'mabasosphesihle25@gmail.com','Sphesihle','1910'
);
INSERT INTO tasks (user_id, scope, title, description, start_time, end_time)
VALUES 
(1, 'Work', 'Finish Report', 'Complete the quarterly report', '2025-12-01 09:00:00', 1);