var express = require('express');
var router = express.Router();
var connection = require('../db.js');

const mysql = require("mysql");

//const passport = require("passport");
//const LocalStrategy = require('passport-local').Strategy;


//const session = require('express-session');
//const connect = require('connect');
//const http = require('http');

//var app = connect();


const app = express();




 //matches localhost:8080/api/SignUp
router.post("/api/SignUp", 
 (req,res) => {
const username = req.body.Username; 
const password = req.body.Password; 


  connection.query(`INSERT SignIn (Username, Password) VALUES (?,?)`, [req.body.Username,req.body.Password],  (error, results)=> {
    if (error) 
    return console.error(error.message);
    console.log('signup worked!');

  })
  }
  )




router.get("/api/Login", (req,res)=> {

connection.query("SELECT  * from SignIn", (error, results)=> {
  if (error) {
    res.send(error); 
  }
  else {
    res.json(results)    //({data: result})  if you want data to be more nested...

  }

})

})

module.exports = router; 