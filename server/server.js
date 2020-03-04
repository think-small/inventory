const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require('webpack');
const config = require('../webpack.config');
const compiler = webpack(config);


const app = express();

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    filename: "bundle.js",
    publicPath: "/",
    stats: {
      colors: true
    },
    historyApiFallback: true
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000
  })
);



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



  
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// get the values from the mysql database and then serve the values as a json object 
app.get('/api/8100_all',(req, res) => {


  var sql = 'SELECT Cobas_8100.Lot, Cobas_8100_Transactions.Expiration_Date,  Cobas_8100.Quantity,  Cobas_8100.Name, Cobas_8100_Transactions.Amount, Cobas_8100_Transactions.Quantity_In_Stock, Cobas_8100_Transactions.Update_Time FROM Cobas_8100 INNER JOIN Cobas_8100_Transactions ON Cobas_8100.Lot = Cobas_8100_Transactions.Lot';

     connection.query(sql, (error, result)=> {
       if (error) {
         res.send(error); 
       }
       else {
         res.json(result)    //({data: result})  if you want data to be more nested...
       }
     })
})


app.get('/api/8100',(req, res) => {
  //TIMESTAMPDIFF(DAY, NOW(), Expiration_Date) Time_Left
  connection.query('SELECT id, Name, Lot, Quantity, Expiration_Date, Warning, Time_Left, Date from Cobas_8100 ORDER BY Name ASC', (error, result)=> {
    if (error) {
      res.send(error); 
    }
    else {
      res.json(result)    //({data: result})  if you want data to be more nested...
    }
  })
})

app.get('/api/81001',(req, res) => {
  connection.query('SELECT * from Cobas_8100 ORDER BY Name ASC', (error, result)=> {
    if (error) {
      res.send(error); 
    }
    else {

    res.json(result) 



    }
  })
})




// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../public')));



app.post(`/api/post/8100_Transactions`, (req,res) => {
// add lot into transcations table
//console.log(req.body.Lot); // Expiration_Date, Days_Left,
console.log(req.body.Expiration); 
connection.query(`INSERT Cobas_8100_Transactions (Lot, Expiration_Date,  Amount, Quantity_In_Stock) VALUES (?,?,?,?)`, [req.body.Lot,req.body.Expiration, req.body.Amount,'Default'],  (error, results)=> {
  if (error) 
  return console.error(error.message);
  console.log('updated worked!');
})
}
)
//INSERT INTO Cobas_8100 (id, Name, Lot,  Quantity, Expiration_Date) VALUES (?,?,?,?,?)

app.post('/api/post/8100', (req,res)=> {

   console.log(req.body);

      const id = req.body.Id;    //may not need this? mysql should automatically auto-increment the id
  
      const Name = req.body.Name;
      const Lot = req.body.Lot;  
      const Quantity = req.body.Quantity;
      const Expiration_Date = req.body.Expiration;
     // const Time_Left = req.body.Time_Left; 
    //SELECT Expiration_Date, TIMESTAMPDIFF(DAY, NOW(), Expiration_Date) Time_Left FROM Cobas_8100

   connection.query('INSERT INTO Cobas_8100 (id, Name, Lot,  Quantity, Expiration_Date, Warning) VALUES (?,?,?,?,?,?)' , 
    [id, Name, Lot, Quantity, Expiration_Date, 'Not Expired'],(error, result)=> {
     if (error) {
       res.send(error);
       console.log(error); 
     }
     else {
       console.log('Post worked!!');
       console.log(result);
     }
     
     })

// updates all columns based on this condition
     connection.query('UPDATE Cobas_8100 set Warning = ?  WHERE Time_Left <= 7' , 
     ['Expires Soon!'],(error, result)=> {
      if (error) {
        res.send(error);
        console.log(error); 
      }
      else {
        console.log('Post worked!!');
        console.log(result);
      }
      
      })

      connection.query('UPDATE Cobas_8100 set Warning = ?  WHERE Time_Left < 0' , 
      ['Expired!'],(error, result)=> {
       if (error) {
         res.send(error);
         console.log(error); 
       }
       else {
         console.log('Post worked!!');
         console.log(result);
       }
       
       })



    });

app.delete('/api/delete/8100', (req,res)=> {
  
  let sql = `DELETE FROM Cobas_8100 WHERE id = ?`;
    
  let id = req.body.Id; 

  console.log(id); 


  connection.query(sql, id, (error, results, fields) => {
    if (error)
      return console.error(error.message);
   
    console.log('Deleted Row(s):', results.affectedRows);
  });

})


app.delete('/api/delete/8100_Transactions', (req,res)=> {
  
  let sql = `DELETE FROM Cobas_8100_Transactions WHERE Lot = ?`;
    
  let Lot = req.body.Lot; 

  console.log(Lot); 


  connection.query(sql, Lot, (error, results, fields) => {
    if (error)
      return console.error(error.message);
   
    console.log('Deleted Row(s):', results.affectedRows);
  });

})


app.put('/api/update/8100', (req,res)=> {

  console.log('the quantity is ' + req.body.Quantity);
  //console.log(req.body.Id);
    let Quantity = req.body.Quantity; 
    let Id = req.body.Id; 
    let Lot = req.body.Lot; 
  console.log('the Expriation Date is ' + req.body.Expiration);
/** 
    connection.query(`INSERT Cobas_8100  ( Quantity, Id, Name, Lot,Expiration_Date) VALUES (?,?,?,?,?)`, [Quantity, Id, req.body.Name,req.body.Lot, req.body.Expiration],  (error, results)=> {
      if (error) 
      return console.error(error.message);
      console.log('updated worked!');
    })
 **/
// get the id from the frontend and also get the Quantity (from Cobas8100.js page)
console.log('the id is ' + Id); 
if (req.body.Quantity ==="") {
connection.query(`UPDATE Cobas_8100 SET Expiration_Date  =? WHERE Id = ?`, [ req.body.Expiration, Id], (error, results) =>{
          if (error) 
          return console.error(error.message);
          console.log('Expiration Date update worked!');
} )
}

if (req.body.Expiration ==="") {
  connection.query(`UPDATE Cobas_8100 SET Quantity  =? WHERE Id = ?`, [ Quantity, Id], (error, results) =>{
            if (error) 
            return console.error(error.message);
            console.log('updated worked!');
  } )
  }





})


// a dummy route to see if this file will work
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