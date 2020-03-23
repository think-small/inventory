import React, { useState,useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";



import "./index.css";

const Login = () =>  {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database_username, setDatabase_username] = useState([]);

useEffect(  ()=> {

  const fetchData1 = async ()=> {
    const res = await fetch("/api/Username");
    res.json().then(res => setDatabase_username(res))
    .catch(err => console.log(err));
  }
      fetchData1(); 



    }, [],
  )


  

function validateForm() {
    return username.length > 0 && password.length > 0;

  }

  

function handleChange (event) {
    //this.setState({
    //  [event.target.id]: event.target.value
   // });

const value = event.target.value;
//console.log(value);
const type = event.target.type; 
//console.log(type);
if (type==="text"){
  setUsername(value);
}
if (type==="password") {
  setPassword(value);
}

  }


const handleSubmit = event => {
    event.preventDefault();




const data = {Username: username, 
              Password: password
            };


fetch("/api/SignUp", {
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
  .catch(function(err) {
    console.log(err);
  });

// check to see if the username is unique or if it is a duplicate, if not unique do not allow POST....
  var x = 0;
  var counter = 0;
  var counter2 = 1;   
  while (x<database_username.length) {
        x++;
      
       // console.log(database_username[x].Username)
        if (username===database_username[x].Username) {
              counter++; 
              if (counter===1) {
                alert('not unique-Please try again')
                break; 
              }
         }
         if (username!==database_username[x].Username) {
          counter2++; 
       
          console.log(counter2);
          console.log(database_username.length); 
          if (counter2===database_username.length) {
            alert('unique password!')
            window.location.href = '/';
            break; 
          }
     }
}




  event.preventDefault();
event.target.reset(); //this will clear the form after you submit




// when the post is complete clear the form and possibly redirect the user to the main page??
setUsername("");
setPassword("");


}

 //const Users = database_username.map((items) => {console.log(items.Username)}); 
 
    return (
  
      <div className="main-wrap">
      <div className="main-register-holder">
      <div className="main-register fl-wrap">
      <h3>Sign Up </h3>
     
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
              placeholder="does nothing yet"
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