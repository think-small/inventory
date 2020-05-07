
import React from "react";



const NavbarComponent = () =>  {

function logout () {
    fetch("/logout")
    .then(response => {
      return response.status; 
    })
    .catch(err => console.log(err));
    // when the user logs out direct them to the dashboard page
    window.location.href = '/';
  }

return (

<div>

<nav className="navbar navbar-light"style={{ marginLeft: "-13em", backgroundColor: "#e6e6e6", padding: "5px", height: "60px",  display: "flex" ,zIndex: "10", boxShadow: "0 2px 2px -2px rgba(0,0,0,.6)" }} >
      <div style={{padding: "5px", marginLeft: "10px", fontSize: "20px"}}>Inventory  </div>
      

<div style={{}}>

<div style={{display: "inline-block", float: "right", position: "relative"}}>
 <button style={{  padding: "7px",display: "inline-block",marginRight: "10px",  color: "black"  }}
 
 onClick={logout}>Logout</button>
 </div> 



<div style={{float: "right", display: "inline-block", position: "relative"}}>
     <a
      className="my-lg-0 border border-dark"
      href="/signup"
      style={{
        padding: "7px",
        display: "inline-block", 
        marginRight: "20px", 
        color: "black"      
      }}

    >
      Sign Up
    </a>
</div>

<div style={{display: "inline-block", float: "right", position: "relative"}}>
    <a className="my-lg-0 border border-dark"
      href="/login"
      style={{
        padding: "7px",
        display: "inline-block",
        marginRight: "10px",
        color: "black"}}
     >
      Sign In
    </a>
 </div>





</div>

  </nav>
 </div>

        )
}

export default NavbarComponent;

