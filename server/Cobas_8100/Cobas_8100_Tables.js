var express = require('express');
var router = express.Router();
var connection = require('../db.js');

//make all the (3) tables here, and also fire the "events" table



var Cobas_8100 = "CREATE TABLE IF NOT EXISTS Cobas_8100(id INT AUTO_INCREMENT PRIMARY KEY,  reagentName VARCHAR(50),displayName VARCHAR(100) NOT NULL, lotNum VARCHAR(100) NOT NULL, quantity INT NOT NULL,isCurrentLot BOOLEAN NOT NULL,isNewLot BOOLEAN NOT NULL,  par INT NOT NULL,  countPerBox INT NOT NULL, expirationDate DATETIME NOT NULL,   timeLeft INT(11) GENERATED ALWAYS AS (TIMESTAMPDIFF(DAY,`Date`, `expirationDate`)), warning VARCHAR(45) NOT NULL,  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, orderID VARCHAR(45) NOT NULL, instrumentID VARCHAR(10) NOT NULL DEFAULT 'Cobas8100')ENGINE=MyISAM;"
  connection.query(Cobas_8100, function (err, result) {
      if (err) throw err;
      console.log("Cobas_8100 table created");
    });  



/** 
var Cobas_8100 = "CREATE TABLE IF NOT EXISTS Cobas_8100(id INT(6) AUTO_INCREMENT PRIMARY KEY,  reagentName VARCHAR(45), displayName VARCHAR(45) NOT NULL, lotNum VARCHAR(45) NOT NULL, quantity INT(45) NOT NULL,isCurrentLot BOOLEAN, isNewLot BOOLEAN,  par INT(45) NOT NULL,  countPerBox INT (45) NOT NULL,      expirationDate DATETIME NOT NULL,   timeLeft INT(11) GENERATED ALWAYS AS (TIMESTAMPDIFF(DAY,`Date`, `expirationDate`)), warning VARCHAR(45) NOT NULL,  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, orderID VARCHAR(45) NOT NULL, instrumentID VARCHAR(10) NOT NULL DEFAULT 'Cobas8100')ENGINE=MyISAM;"
  connection.query(Cobas_8100, function (err, result) {
      if (err) throw err;
      console.log("Cobas_8100 table created");
    });  
*/
var Cobas_8100_Transactions = "CREATE TABLE IF NOT EXISTS Cobas_8100_Transactions (id INT(6) AUTO_INCREMENT PRIMARY KEY, lotNum VARCHAR(45) NOT NULL, transactionType VARCHAR(45), expirationDate DATE NOT NUll, amount VARCHAR(45) NOT NULL, quantityInStock VARCHAR(45) NOT NULL, timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
connection.query(Cobas_8100_Transactions, function (err, result) {
    if (err) throw err;
    console.log("Cobas_8100_Transactions created");
  });





/** 
var Daily_Records = "CREATE TABLE IF NOT EXISTS Cobas_8100_Daily_Records (ENTRIES INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY)SELECT id, lotNum, quantity, date,  expirationDate From Cobas_8100";
connection.query(Daily_Records, function (err, result) {
  if (err) throw err;
  console.log("Daily_Records Table created");
});




var scheduler = "SET GLOBAL event_scheduler = ON";
connection.query(scheduler, function (err, result) {
    if (err) throw err;
    console.log("scheduler turned on!");
  });

//find a better solution when in prodution mode?????  
var drop  = "DROP EVENT test_event_01";
connection.query(drop, function (err, result) {
    if (err) throw err;
    console.log("event is dropped!");
  });

var Event = "CREATE EVENT IF NOT EXISTS test_event_01 ON SCHEDULE EVERY 1 MINUTE DO INSERT INTO Cobas_8100_Daily_Records (id, lotNum, quantity, date, expirationDate)  SELECT id, lotNum, quantity, date, expirationDate From Cobas_8100"; 
connection.query(Event, function (err, result) {
    if (err) throw err;
    console.log("Event fired!");
  });
*/

module.exports = router; 


