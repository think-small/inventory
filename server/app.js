const express = require("express");
var session = require("express-session");
const MySQLStore = require("express-mysql-session");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const db = require('./db.js');
const passport = require('passport');
require("./SignUp/Passport")(passport);

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if (process.env.NODE_ENV !== "test") {
    const webpackMiddlewares = require("./Utility/webpack-middlewares");
    app.use(webpackMiddlewares.dev);
    app.use(webpackMiddlewares.hot);
}

app.use(bodyParser.json());
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

// Handles any requests that don't match the ones above
//u need to include the below code this so that the back knows where to route and (connect with react on the front end!!!)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/api/login", (req, res, next) => {
    passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" })(req, res, next);
})

module.exports = app;