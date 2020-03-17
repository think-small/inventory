
import React from "react";
import moment from "moment";
const Navbar = () =>  {

  const current_time = moment().format("LT");
  const current_date = moment().format("LL");


        return (
          <div>
    <nav className="navbar navbar-light"style={{ marginLeft: "-15em", backgroundColor: "white", padding: "5px", height: "80px",  display: "flex" ,zIndex: "10", boxShadow: "0 2px 2px -2px rgba(0,0,0,.6)" }} >
      <div style={{padding: "5px", marginLeft: "10px", fontSize: "20px"}}>INVENTORY MANGEMENT <span style={{fontSize: "15px"}}> {current_date} {current_time}</span></div>
      

     <div style={{}}>
     <div style={{float: "right", display: "inline-block", position: "relative"}}>
     <a
      className="my-lg-0 border border-dark"
      href="#"
      style={{
        padding: "7px",
        display: "inline-block", 
        marginRight: "20px", 
        color: "black",
        borderRadius: "5px"





      
      }}
      onClick={() => alert("nothing yet!")}
    >
      Sign Up
    </a>
    </div>

    <div style={{display: "inline-block", float: "right", position: "relative"}}>
    <a
      className="my-lg-0 border border-dark"
      href="#"
      style={{
        padding: "7px",
        display: "inline-block",
        marginRight: "10px",
        borderRadius: "5px", 
        color: "black"


        
      }}
      onClick={() => alert("nothing here yet!")}
    >
      Sign In
    </a>
        </div>

</div>

  </nav>
 </div>

        )
}

export default Navbar; 

