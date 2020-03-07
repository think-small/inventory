var express = require('express');
var router = express.Router();
var connection = require('../db.js');

//make all the (3) tables here, and also fire the "events" table


var Cobas_8100 = "CREATE TABLE IF NOT EXISTS Cobas_8100(id INT(6) AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(45) NOT NULL,Lot VARCHAR(45) NOT NULL,Quantity VARCHAR(45) NOT NULL,isCurrentLot BOOLEAN, isNewLot BOOLEAN,  par VARCHAR(45) NOT NULL,  countPerBox VARCHAR (45) NOT NULL,   Expiration_Date DATE NOT NULL,Time_Left INT(11) GENERATED ALWAYS AS (TIMESTAMPDIFF(DAY,`Date`, `Expiration_Date`)), Warning VARCHAR(45) NOT NULL,  Date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)ENGINE=MyISAM;"
connection.query(Cobas_8100, function (err, result) {
    if (err) throw err;
    console.log("Cobas_8100 table created");
  });

var Cobas_8100_Transactions = "CREATE TABLE IF NOT EXISTS Cobas_8100_Transactions ( Lot VARCHAR(45) NOT NULL, Expiration_Date VARCHAR(45) NOT NUll, Amount VARCHAR(45) NOT NULL, Quantity_In_Stock VARCHAR(45) NOT NULL, Update_Time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
connection.query(Cobas_8100_Transactions, function (err, result) {
    if (err) throw err;
    console.log("Cobas_8100_Transactions created");
  });


var Daily_Records = "CREATE TABLE IF NOT EXISTS Cobas_8100_Daily_Records (ENTRIES INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY)SELECT id, Lot, Quantity, Date, Expiration_Date From Cobas_8100";
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

var Event = "CREATE EVENT IF NOT EXISTS test_event_01 ON SCHEDULE EVERY 1 MINUTE DO INSERT INTO Cobas_8100_Daily_Records (id, Lot, Quantity, Date, Expiration_Date)  SELECT id, Lot, Quantity, Date, Expiration_Date From Cobas_8100"; 
connection.query(Event, function (err, result) {
    if (err) throw err;
    console.log("Event fired!");
  });


module.exports = router; 


