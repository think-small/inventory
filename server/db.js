const mysql = require('mysql');

//make the connection to the database

const connection = mysql.createConnection({
    host:	'localhost',
    port:	'8889',
    user:	'root',
    password:	'root', 
    database: 'Inventory'
    });
    
    connection.connect(err => {
      if (err) {
        return err; 
      }
    });


module.exports = connection; 