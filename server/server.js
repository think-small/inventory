const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const config = require("../webpack.config");
const compiler = webpack(config);



const app = express();
const passport = require("./SignUp/Passport.js");

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




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

app.use(bodyParser.urlencoded({ extended: false }));
//var session = require('express-session');
//app.set('trust proxy', 1) // trust first proxy
//app.use(session({
//  secret: 'keyboard cat',
 // resave: false,
 // saveUninitialized: true,
 // cookie: { secure: true }
//}))




// parse application/json
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../public")));

app.use(require("./Cobas_8100/Cobas_8100_Routes"));
app.use(require("./Cobas_8100/Cobas_8100_Tables"));
app.use(require("./Architect/Architect_Routes"));
app.use(require("./ABL/ABL_Routes"));
app.use(require("./SignUp/SignUp_Routes"));

// a dummy route to see if this file will work
app.get("/api/hello", (req, res) => {
  res.json("hello world!");
  console.log("hopefully this works!");
});

// Handles any requests that don't match the ones above
//u need to include the below code this so that the back knows where to route and (connect with react on the front end!!!)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});



  app.post('/api/login', 
  passport.authenticate('local'), function(req, res) {
   // if everything has been authenticated from the Passport.js console.log(req.user), then send json...
   
   //just put something here for now , so that the client side is able to process requests from Passport.js file....
   res.json("/Cobas8100")
  

 });

const port = process.env.PORT || 8080;
app.listen(port);

console.log(
  "Hello, (This the server.js file speaking) App is listening on port " + port
);
