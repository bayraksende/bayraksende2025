CREATE DATABASE IF NOT EXISTS csrf_soru
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE csrf_soru;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    position VARCHAR(255) NOT NULL,
    bakiye INT DEFAULT 0
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS session (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cookie VARCHAR(255) NOT NULL,
    bakiye INT NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

INSERT INTO users (username, password, name, surname, email, position, bakiye) VALUES
('zigzantares', 'geriDonGeriiiDoonNeolurgeriidoon', 'Can', 'Beskardes', 'zigzantares@urbatek.tr', 'Proje Yoneticisi', 3783),
('numanturle', 'parolasafakkardesimparolasaafaak', 'Numan', 'Turle', 'numanturle@urbatek.tr', 'Siber Guvenlik Alan Sefi', 4965),
('kelten0589', 'parolasafakkardesimparolasaafaak', 'Mehmet', 'Kelten', 'kelten0589@urbatek.tr', 'Saglik Görevlisi', 0),
('mdadaligil', 'parolasafakkardesimparolasaafaak', 'Murat', 'Dadaligil', 'dadaligil@urbatek.tr', 'CEO', 145300),
('admin', 'kardesimbuparolayikullanmanagerekyokk', 'Cafer', 'Uluc', 'admin@urbatek.tr', 'Sistem Admini', 80842);    