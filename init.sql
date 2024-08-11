CREATE DATABASE IF NOT EXISTS votes_db;

USE votes_db;

CREATE TABLE IF NOT EXISTS votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    choice ENUM('android', 'ios') NOT NULL
);
