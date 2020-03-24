import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";




import "./index.css";

const Login = ()=>  {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namefrom,setnamefrom]  = useState("");




  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleChange = event => {
   // this.setState({
     // [event.target.id]: event.target.value
   // });
  const value = event.target.value; 
  const target = event.target.type
  
console.log(value);
console.log(target);
if (target==="text") {
  setUsername(value);
}
if (target==="password") {
  setPassword(value);
}


}

const handleSubmit = event => {
    event.preventDefault();

const data = 
{username:username, 
  password:password};

fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json"  ,credentials: "include" },
  body: JSON.stringify(data)
})
  .then(function(response) {
 
    //alert(response.status)
    
    if (response.status >= 400) {
    // throw new Error("Bad response from server");
    //if there is a bad response from the server it means that the Passport.js file has found something wrong
    //with either the username or the password
     window.location.href = '/login';

    }
 //   if (response.status==200) {
    //if the username and password is sucessful from the backend then go to the homepage
   //    window.location.href = '/';
 // }
      return response.json();
  })
  
  .then(function(data) {
    //any data that is returned from the backend 
//    alert('the data ' + data);
//    alert(data.username);
    setnamefrom(data.username);
    // getting data back, but not maintaing session
   // window.location.replace(data);
    })
  .catch(function(err) {
    console.log(err);
    alert(err); 
  });



//clear form
setUsername("");
setPassword("");
}




    return (
      <div className="main-wrap">
      <div className="main-register-holder">
      <div className="main-register fl-wrap">
     
<div></div>
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" >
          <FormLabel>Email/Username {namefrom}</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          
          disabled={!validateForm()}
          type="submit"
        >
          Login
        </Button>

        <p className="mt-3">Click <a href="/signup">HERE </a> to Register!</p>
        <p className="mt-1">Click <a href="/"> HERE </a> to Return home</p>
      </form>
    </div>
    </div>
    </div>
    </div>
    
  );
}
export default Login; 