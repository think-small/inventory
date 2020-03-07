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

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../public')));


app.use(require('./Cobas_8100/Cobas_8100')); 
app.use(require('./Cobas_8100/Cobas_8100_Tables'));



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