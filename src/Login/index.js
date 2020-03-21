import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";




import "./index.css";

const Login = ()=>  {







  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState([]);
  
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleChange = event => {
   // this.setState({
     // [event.target.id]: event.target.value
   // });
  const value = event.target.value; 
  const target = event.target.type
  
console.log(value);
console.log(target);
if (target==="email") {
  setEmail(value);
}
if (target==="password") {
  setPassword(value);
}


}



const handleSubmit = event => {
    event.preventDefault();

alert(email );
alert(password);

// save the information to the database HERE:
fetch.post('/api/login', {
  //username: this.state.username,
  email: email,
  password: password

})
.then(function (data) {
// console.log(response);
console.log(data);
//console.log('i thinked it worked login.js');
 window.location.replace(data.data);   

// window.location.replace("https://www.w3schools.com") this works
 // how can you make data into a route? 
 })
.catch(function (error) {
  console.log(error);
});

// when the post is complete clear the form and possibly redirect the user to the main page??
setEmail("");
setPassword("");
}

useEffect(
  
  ()=> {


      const fetchData = async ()=> {
        const res = await fetch("/api/Login")
       res.json().then(res => setDatabase(res))
      
        .catch(err => console.log(err));
      }
          fetchData(); 
   
   
   
        }, [],
        )

  const size = database.length; 


    return (
      <div className="main-wrap">
        <div className="main-register-holder">
        <div className="main-register fl-wrap">
          <div>the size of the signin database is {size}</div>
<div></div>
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" >
            <FormLabel>Email/Username</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={email}
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