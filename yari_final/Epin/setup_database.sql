DROP DATABASE IF EXISTS epin_db;

CREATE DATABASE epin_db;
USE epin_db;

CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS kodlar (
    id INT PRIMARY KEY,
    urun_kodu VARCHAR(255),
    gizli_kod VARCHAR(255)
);

INSERT INTO products (id, name, description, price) VALUES
(1, 'VALORANT-6000VP', 'Valorant 6000 VP', 599.99),
(2, 'VALORANT-3000VP', 'Valorant 3000 VP', 299.99),
(3, 'VALORANT-2000VP', 'Valorant 2000 VP', 199.99),
(4, 'VALORANT-1000VP', 'Valorant 1000 VP', 99.99),
(5, 'VALORANT-500VP', 'Valorant 500 VP', 49.99),
(7, 'LOL-6000RP', 'League of Legends 6000 RP', 599.99),
(8, 'LOL-3000RP', 'League of Legends 3000 RP', 299.99),
(9, 'LOL-2000RP', 'League of Legends 2000 RP', 199.99),
(10, 'LOL-1000RP', 'League of Legends 1000 RP', 99.99),
(11, 'LOL-500RP', 'League of Legends 500 RP', 49.99);

INSERT INTO kodlar (id, urun_kodu, gizli_kod) VALUES 
(1, 'ADMIN-FLAG', 'QmF5cmFrQmVuZGV7WTNOMV9TM1QxX0IzRzNORDFOTTF9'); 