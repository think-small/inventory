var express = require('express');
var router = express.Router();
var connection = require('../db.js');


var isAuthenticated = require("./isAuthenticated");

router.post("/api/SignUp", (req,res) => {
  connection.query(`INSERT SignIn (Username, Password) VALUES (?,?)`, [req.body.Username,req.body.Password],  (error, results)=> {
    if (error) 
    return console.error(error.message);
    console.log('signup worked!');

  })
  }
  )
  
router.get('/api/Username',(req, res) => {
    connection.query('SELECT Username from SignIn', (error, result)=> {
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
    res.json(req.user);
  });


router.get("/logout", function(req, res) {
    console.log('loggin out ' + req.user[0].Username);
    req.logout();
    res.json({message:"it worked!"})
  });



/** 
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
**/




module.exports = router; 