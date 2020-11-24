const mysql = require('mysql');

//make the connection to the database
let database = 'Inventory';
if (process.env.NODE_ENV === "test") database = 'InventoryTest';

const connection = mysql.createConnection({
    host:	'localhost',
    port:	'8889',
    user:	'root',
    password:	'root', 
    database
    });
    
    connection.connect(err => {
      if (err) {
        return err; 
      }
    });


module.exports = connection; 