import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";



import "./index.css";

const Login = () =>  {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  

function validateForm() {
    return username.length > 0 && password.length > 0;

  }

  

function handleChange (event) {
    //this.setState({
    //  [event.target.id]: event.target.value
   // });

const value = event.target.value;
console.log(value);
const type = event.target.type; 
console.log(type);
if (type==="text"){
  setUsername(value);
}
if (type==="password") {
  setPassword(value);
}

  }


const handleSubmit = event => {
    event.preventDefault();
//alert(username); 
//alert(password);
  //  console.log('currently the email is' + this.state.email);
  //  console.log('the username is ' + this.state.username); 
  //  console.log('the password is ' + this.state.password );

// save the information to the database HERE:

const data = {Username: username, 
              Password: password
            };
//alert(data);


fetch("api/SignUp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })

  .then(function(data) {
    //  alert(data);

    if (data === "success") {
      console.log("thanks for submitting!");
    }
  })
  .catch(function(err) {
    console.log(err);
  });

event.preventDefault();
event.target.reset(); //this will clear the form after you submit




// when the post is complete clear the form and possibly redirect the user to the main page??
setUsername("");
setPassword("");
}
 

    return (
      <div className="main-wrap">
      <div className="main-register-holder">
      <div className="main-register fl-wrap">
      <h3>Sign Up</h3>
     
      <div className="Login">
        <form onSubmit={handleSubmit}>         
          <FormGroup controlId="username" >
            <FormLabel>Email/UserName</FormLabel>
            <FormControl
             
             value={username}
             onChange={handleChange}
             type="username"
             
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
          <FormGroup controlId="password1" >
            <FormLabel>Re-enter Password</FormLabel>
            <FormControl
              type="password"
            />
          </FormGroup>
          <Button
            block
            
            disabled={!validateForm()}
            type="submit"
          >
            Submit
          </Button>
          
          
          
          <p className="mt-1">Click <a href="/"> HERE </a> to return home</p>
        </form>
      </div>
      </div>
      </div>
      </div>
      
    );
  
}
export default Login; 