const express = require("express");
var session = require("express-session");

const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const config = require("../webpack.config");
const compiler = webpack(config);

const passport = require("./SignUp/Passport.js");

//var isAuthenticated = require("./SignUp/isAuthenticated");

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

// parse application/json
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../public")));

// We need to use sessions to keep track of our user's login status-make the cookie
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    httpOnly: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./Utility/Utility"));
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

app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //if passport did authenticate you will get the latest user
  // console.log('the user is ' + req.user);
  //console.log(req.user[0])
  //console.log(req.user[0].Username);

  //makes a different id everytime u succesfully login
  // console.log('the session is ' + req.session.id);

  //for (const property in req.session.cookie.data) {
  //  console.log(`${property}: ${req.session.cookie.data[property]}`);
  // }
  //just put something here for now , so that the client side is able to process requests from Passport.js file....
  //res.json(req.user[0])

  res.json({ message: "Success", username: req.user[0].Username });
});

/** 
 app.get('/api/Cobas9', isAuthenticated,
  function(req, res) {
   // console.log('in cobas09000' + req.user )
   // res.json({ id: req.user.Id, username: req.user.Username });
   res.status(200).json({
    status: 'Login successful!'
});
  });
**/

const port = process.env.PORT || 8080;
app.listen(port);

console.log(
  "Hello, (This the server.js file speaking) App is listening on port " + port
);
