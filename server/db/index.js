const mysql = require ('mysql');
const Config = require ('../Config');

const  Inventory = require ('./Inventory'); 

const Connection = mysql.createConnection(Config.sql1.mysql);  // makes the connection
Connection.connect(err => {
    if (err) console.log(err); 
})

exports.Connection = Connection; 
exports.Inventory = Inventory; 
//export default {
  //   Blog };