var express = require('express');
var router = express.Router();
var connection = require('../db.js');
const { userValidationRules, validate } = require("./signup.validator.js");


var isAuthenticated = require("./isAuthenticated");

router.post("/api/signup", userValidationRules(), validate, (req,res) => {
  connection.query(`INSERT users (email, Password) VALUES (?,?)`, [req.body.email,req.body.Password],  (error, results)=> {
    if (error) return console.error(error.message);
    console.log('signup worked!');

  })
  }
  )
  
router.get('/api/email',(req, res) => {
    connection.query('SELECT email from users', (error, result)=> {
      if (error) {
        res.send(error);
      }
      else {
      res.json(result)
      }
    })
  })


router.get('/api/Cobas9', isAuthenticated, function(req, res) {
    console.log('if authentication worked you will get req.user back(serilized by passport.js): ' + req.user )
  //console.log(req.user[0].Username)  //safer to send just the username back
  });


router.get("/logout", function(req, res) {
    console.log('loggin out ' + req.user[0].email);
    req.logout();
    res.json({message:"it worked!"})
  });



/** 
router.get("/api/login", (req,res)=> {
connection.query("SELECT  * from SignIn", (error, results)=> {
  if (error) {
    res.send(error); 
  }
  else {
    res.json(results)    //({data: result})  if you want data to be more nested...

  }

})
})
**/




module.exports = router; 