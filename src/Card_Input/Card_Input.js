import React, { useState } from "react";

import Card from "react-bootstrap/Card"; 
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";



const Card_Input = (props) => {



return (

 <div style={{ display: "inline-block", float:"right", padding: "10px"}} >      
       
 <Card style={{ width: '13rem',padding: '5px' }}>
<Card.Header>Make New Lot </Card.Header>
<ListGroup variant="flush" >


<form onSubmit={props.handleSubmit } >
<div style={{padding: "5px"}}>
 
<input type="text"   name="Lot" onChange={ props.handleInputChange }  placeholder= "Lot Number"   />

</div>
<div style={{padding: "5px"}}>    <select
     
         onChange={
           props.handleInputChange
         }
       >
         <option name="Blue Caps" value="Blue Caps">
           Blue Caps
         </option>
         <option name="Pipette Tips" value="Pipette Tips">
           Pipette Tips
         </option>
       </select>
</div>
<div style={{padding: "5px"}}>            
<input
   
       type="text"
       name="Quantity"

       onChange={props.handleInputChange}
       placeholder="Quantity"
     />
 </div>

 <div style={{padding: "5px"}}>
   <label >
     <input style={{pading: "10px"}} type="radio" name="isCurrentLot" value="isCurrentLot" onChange={props.handleChangeisCurrentLot} />
     Is Current Lot
   </label>
 </div>

 <div style={{padding: "5px"}}>
   <label>
     <input type="radio" name="isNewLot" value="isNewLot" onChange={props.handleChangeisNewLot} />
     New Lot?
   </label>
 </div>
 <div style={{padding: "5px"}}>            

<input
   
       type="text"
       name="par"
     
       onChange={props.handleInputChange}
       placeholder="Par"
     />
 </div>

 <div style={{padding: "5px"}}>            
<input
   
       type="text"
       name="countPerBox"

       onChange={props.handleInputChange}
       placeholder="Count Per Box"
     />
 </div>

<div style={{padding: "5px"}} >
     Expiration: 
     <input
  
       type="text"
       placeholder="YYYY-MM-DD"
       name="Expiration"
   
       onChange={props.handleInputChange}
     />


     </div>
<div style={{padding:"5px"}}> 
<button>Submit</button>
  </div>

</form>

</ListGroup>

</Card>
</div>



)
}

export default Card_Input; 