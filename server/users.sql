CREATE TABLE IF NOT EXISTS SignIn
(id INT(6) AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(45) NOT NULL UNIQUE,
password VARCHAR(45) NOT NULL)