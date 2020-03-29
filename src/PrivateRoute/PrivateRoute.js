import React, {useEffect, useState }from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

const PrivateRoute = ({children, ...rest} )=> {

const [isAuthenticated, setAuthentication] = useState(true); 

const [database, setdatabase] = useState([]);

useEffect(
    ()=> {

       
   const fetchData = async ()=> {
       
     const res = await fetch("/api/Cobas9", {credentials: 'include'});
     res.json().then(res => setdatabase(res))
   
     .catch(err => console.log(err));
   }
     
   fetchData();  
     },  [],
     )


alert( 'length is ' + database.length);
// the length is initially zero, but when you do the useeffect if you are logged in then length will be
//update to 1
//if you are not logged in the database.length will be undefined 






return (



<Route    
{...rest}
render={ routeprops =>  isAuthenticated ? (children): ( <Redirect to="/login"  /> )}
/>
)
}


export default PrivateRoute; 