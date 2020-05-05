import React, {useEffect, useState }from "react";
import NavbarComponent from "../../components_/navbar/navbar.component";



const Cobas8000Component = () => {

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


function logout () {
  fetch("/logout")
  .then(response => {
    return response.status; 
  })
  .catch(err => console.log(err));
}

       
         
                   
return (

<div>
<NavbarComponent />
<div>Use this page temporarily to see if username and login works</div>

{database.length === 1 ? <h1>Hello, {   database.map(item=> <h1>{item.Username}
<button onClick={logout}>Logout</button>
</h1>)} </h1> : <h1>Noone is logged in yet</h1>      }


</div>
);
};
export default Cobas8000Component;
