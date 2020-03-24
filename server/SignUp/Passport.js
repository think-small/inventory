
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../db.js');
var express = require('express');
var router = express.Router();
//router.use(passport.initialize());
//router.use(passport.session());

passport.use(new LocalStrategy(     {usernameField: 'username',
passwordField: 'password'} ,

  function(username, password, done) {
    connection.query("SELECT *  from SignIn where Username = ?", [username],  function(err, user) {
/** 
       console.log('the passwrod is ' + password);
       console.log('the user is ' + user);
       for (const property in user) {
         console.log(`${property}: ${user[property]}`);
       }
    // console.log('username is ' + user[0].Username)  //just do a normal for loop now 
 **/    
     //  console.log(password);
 //   console.log('in the passportjs file' + user[0].Username);
    
    //   console.log(user[0].Password); will cause failure to fetch and shutdown server...

       if (err) { 
          console.log('Passport.js file' + err);
          return done(err);
     }
     
      if (Object.keys(user).length === 0) {     //check to see if the object is empty, if it is then username does not exist 
        console.log('user does not exist')
        return done(null, false, { message: 'Incorrect username.' });
      }

   //   if (!user.validPassword(password)) {
        
     ///  return done(null, false, { message: 'Incorrect password.' });
     // }
   
      return done(null, user);
    });
  }

));

//function validPassword(password) {
//compare the entered password with what is in the database
// in the future SignIn page make sure that the username is unique 
//  }


  
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });



module.exports = passport; 