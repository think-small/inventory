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


app.get('/api/8100',(req, res) => {
  connection.query('SELECT * from Cobas_8100', (error, result)=> {
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


app.post('/api/z', (req,res)=> {

   console.log(req.body);

      const id = req.body.Id;    //may not need this? mysql should automatically auto-increment the id
       const Name = req.body.Name;
        const Quantity = req.body.Quantity;
       

   connection.query('INSERT INTO Cobas_8100 (id, Name, Quantity) VALUES (?,?,?)' , 
    [id, Name, Quantity],(error, result)=> {
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