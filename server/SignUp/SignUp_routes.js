var express = require('express');
var router = express.Router();
var connection = require('../db.js');


const passport = require("./Passport.js");


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