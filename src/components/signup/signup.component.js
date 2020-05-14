import React, { useState,useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";



import "./signup.styles.css";

const Login = () =>  {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_verify, setVerify] = useState("");
  const [database_email, setDatabase_email] = useState([]);
  const [array_count, setarray_count] = useState([]);

useEffect(  ()=> {

  const fetchData1 = async ()=> {
    const res = await fetch("/api/signup");
    res.json().then(res => setDatabase_email(res))
    .catch(err => console.log(err));
  }
      fetchData1(); 



    }, [],
  )

function validateForm() {
     
// verify the inputs, before posting into database
return email.length > 0 && password.length > 0 && password_verify.length> 0  && password.trim()===password_verify.trim() ;
                                  
  }

function handleChange (event) {
const value = event.target.value;
console.log(value);

const id = event.target.id; 
// get the id from the form and set and new value for them 
if (id==="email"){
  setEmail(value);
}
if (id==="password") {
  setPassword(value);
}
if (id=="verify_password") {
  setVerify(value)
}
}


const handleSubmit = event => {
    event.preventDefault();

const data = {email: email,
              Password: password
            };


fetch("/api/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
    .then(data => {
        if (data.errors.length > 0) {
            data.errors.forEach(err => console.error(`${Object.keys(err)[0]}: ${Object.values(err)[0]}`));
        }
    })
  .catch(function(err) {
    console.log(err);
  });

// check to see if the email is unique or if it is a duplicate, if not unique do not allow POST....
  var x = 0;
  var counter = 0;
  var counter2 = 1;   

  while (x<database_email.length) {
        x++;
      
        if (email===database_email[x].email) {
              counter++; 
           
               if (counter===1) {
                 //'push' into the array 
                 setarray_count(prevArray => [...prevArray, counter])
               //  alert('array count shold be 1 or greator b/c the state does not reset to 0,counter does reset ' + array_count.length)
                //  alert('not unique-Please try again')
                break; 
              }
         }

         // the case when the email is unique
         if (email!==database_email[x].email) {
          counter2++; 
       
          console.log(counter2);
          console.log(database_email.length);
          if (counter2===database_email.length) {
         //   alert('unique password!')
         //if unique then go to this route for now 
            window.location.href = '/login';
            break; 
          }
     }
}

event.preventDefault();
event.target.reset(); //this will clear the form after you submit
// when the post is complete clear the form and possibly redirect the user to the main page??
setEmail("");
setPassword("");
}

  
 //const Users = database_email.map((items) => {console.log(items.email)});
 
    return (
  
      <div className="main-wrap">
      <div className="main-register-holder">
      <div className="main-register fl-wrap">
      <h3>Sign Up</h3>
       
      <div className="Login">
        <form onSubmit={handleSubmit}>         
          <FormGroup >
            <FormLabel>Email</FormLabel>
            <FormControl
             
             value={email}
             onChange={handleChange}
             id="email"
             
            />
            {array_count.length >= 1 ? <div style={{color: "red"}}>Email already taken! Try another one </div> : <div></div>}
          </FormGroup>

          
          
          
          
          <FormGroup  >
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={handleChange}

              id="password"
            />
          </FormGroup>
          <FormGroup  >
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              value={password_verify}
              onChange={handleChange}
              
              id="verify_password"
  
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