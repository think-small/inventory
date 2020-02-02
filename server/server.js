const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();



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


// get the values from the mysql database and then serve the values as a json object 
app.get('/api/ABL',(req, res) => {
     connection.query('SELECT * from ABL', (error, result)=> {
       if (error) {
         res.send(error); 
       }
       else {
         res.json(result)    //({data: result})  if you want data to be more nested...
       }
     })
})





// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../public')));

// An api endpoint that returns a short list of items-for testing purposes only 
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

app.get('/api/hello', (req,res)=> {
  res.json("hello world!")
  console.log('hopefully this works!');
})

// Handles any requests that don't match the ones above

//u need to include the below code this so that the back knows where to route and (connect with react on the front end!!!)
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



const port = process.env.PORT || 8080
app.listen(port);

console.log('Hello, (This the server.js file speaking) App is listening on port ' + port);