CREATE TABLE IF NOT EXISTS new_table
SELECT Quantity, Date, Expiration_Date
From Cobas_8100

SHOW PROCESSLIST;
SHOW EVENTS; 


SET GLOBAL event_scheduler = ON; 
 
CREATE TABLE IF NOT EXISTS Cobas_8100_Daily_Records (ENTRIES INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY)
SELECT id, Lot, Quantity, Date, Expiration_Date From Cobas_8100

DROP EVENT test_event_01;

CREATE EVENT IF NOT EXISTS test_event_01
ON SCHEDULE EVERY 1 SECOND
DO
INSERT INTO Cobas_8100_Daily_Records (id, Lot, Quantity, Date, Expiration_Date)  
SELECT id, Lot, Quantity, Date, Expiration_Date From Cobas_8100
SET GLOBAL event_scheduler = ON; 

CREATE TABLE IF NOT EXISTS Cobas_8100 (
id INT(6) AUTO_INCREMENT PRIMARY KEY,
Name VARCHAR(45) NOT NULL,
Lot VARCHAR(45) NOT NULL,
Quantity VARCHAR(45) NOT NULL,
isCurrentLot BOOLEAN, 
isNewLot BOOLEAN, 
par VARCHAR(45) NOT NULL, 
countPerBox VARCHAR (45) NOT NULL,  
Expiration_Date DATE NOT NULL,
Time_Left INT(11) GENERATED ALWAYS AS (TIMESTAMPDIFF(DAY,`Date`, `Expiration_Date`)),
Warning VARCHAR(45) NOT NULL,
Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=MyISAM;

INSERT INTO `Cobas_8100` (`id`, `Name`, `Lot`, `Quantity`, `isCurrentLot`, `isNewLot`, `par`, `countPerBox`, `Expiration_Date`, `Warning`) VALUES
('2', 'Blue Caps', 'F6', '30', true, false, '8', '32', '2020-04-27', 'okay');


CREATE TABLE IF NOT EXISTS Cobas_8100_Transactions (
id INT(6) AUTO_INCREMENT PRIMARY KEY,
Lot VARCHAR(45) NOT NULL, 
Expiration_Date VARCHAR(45) NOT NUll, 
Amount VARCHAR(45) NOT NULL, 
Quantity_In_Stock VARCHAR(45) NOT NULL,
Update_Time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)




SELECT Cobas_8100.Lot, Cobas_8100.Quantity, Cobas_8100.Name, Cobas_8100_Transactions.Amount, Cobas_8100_Transactions.Quantity_In_Stock, Cobas_8100_Transactions.Update_Time
FROM Cobas_8100 INNER JOIN Cobas_8100_Transactions ON Cobas_8100.Lot = Cobas_8100_Transactions.Lot;
