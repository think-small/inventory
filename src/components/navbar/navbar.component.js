
import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";



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

<div style={{zIndex:"10"}}>

<Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{zIndex:"1000",}}>
  <Navbar.Brand href="/">Inventory Management</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
 
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="/SignUp">Sign Up</Nav.Link>
      <Nav.Link href="/Login">Login  </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>


</div>





        )
}

export default NavbarComponent;

