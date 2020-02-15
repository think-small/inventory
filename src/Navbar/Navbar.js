
import React from "react";

const Navbar = () =>  {


        return (
          <div>
    <nav className="navbar navbar-light"style={{ marginLeft: "-10em", backgroundColor: "white", padding: "5px", display: "flex" ,zIndex: "10", boxShadow: "0 2px 2px -2px rgba(0,0,0,.6)" }} >
      <div style={{padding: "5px", marginLeft: "10px", fontSize: "19px"}}><i><b>Inventory App</b></i></div>
       <input type="text" placeholder="Search" style={{   backgroundColor: "lightgrey" , padding: "0 16px 0 40px",  height: "36px", width: "40%", align: "center", margin: "0 auto", borderRadius: "4px", border: "1px solid white"}} />
     
     <div style={{display: "inline-block"}}>
     <a
      className="my-lg-0 border border-dark"
      href="#"
      style={{
        padding: "7px",
        display: "inline-block",
        marginLeft: "auto",
        marginRight: "7px",
        color: "black", 
        borderRadius: "4px"
      
      }}
      onClick={() => alert("nothing yet!")}
    >
      Sign Up
    </a>
    </div>

    <div style={{display: "inline-block"}}>
    <a
      className="my-lg-0 border border-dark"
      href="#"
      style={{
        padding: "7px",
        display: "inline-block",
        marginLeft: "auto",
        marginRight: "1rem",
        backgroundColor: "#9147ff", 
        color: "black",
        borderRadius: "4px", 
       
        
      }}
      onClick={() => alert("nothing here yet!")}
    >
      Sign In
    </a>
        </div>


  </nav>
 </div>

        )
}

export default Navbar; 

