const express = require("express");
var session = require("express-session");
const MySQLStore = require("express-mysql-session");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const webpack = require("webpack");
const config = require("../webpack.config");
const compiler = webpack(config);
const db = require('./db.js');
const passport = require('passport');
require("./SignUp/Passport")(passport);

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
const options = {
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "Inventory",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}

const sessionStore = new MySQLStore(options, db);
app.use(
  session({
    secret: "keyboard cat",
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
      }
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(require("./Utility/Utility"));
app.use(require("./Cobas_8100/Cobas_8100_Routes"));
app.use(require("./Cobas_8100/Cobas_8100_Tables"));
app.use(require("./Architect/Architect_Routes"));
app.use(require("./ABL/ABL_Routes"));
app.use(require("./SignUp/signup.routes"));

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

app.post("/api/login", (req, res, next) => {
    passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" })(req, res, next);
})

const port = process.env.PORT || 8080;
app.listen(port);

console.log(
  "Hello, (This the server.js file speaking) App is listening on port " + port
);
