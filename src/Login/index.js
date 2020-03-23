import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";




import "./index.css";

const Login = ()=>  {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");




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
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then(function(response) {
 
    //alert(response.status)
    
    if (response.status >= 400) {
    // throw new Error("Bad response from server");
    //if there is a bad response from the server it means that the Passport.js file has found something wrong
    //with either the username or the password
     window.location.href = '/Login';

    }
    if (response.status==200) {
    //if the username and password is sucessful from the backend then go to the homepage
       window.location.href = '/';
  }
  
  })
  
  .then(function(data) {
    //any data that is returned from the backend 
    //  alert('the data ' + data);
    //  console.log(data);
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


<form  onSubmit={handleSubmit } >
<div className="containment" >
<label className="top_label">username </label>          
  <input type="username" name="username" id="username" onChange={handleChange}  />
</div>


<div className="containment" > 
<label >password</label>               
  <input type="password"name="password" id="password" onChange={handleChange} />
</div>
<div></div>

  <button className="submit_button" >Submit</button>





</form>



        
  
    )
    }
export default Login; 