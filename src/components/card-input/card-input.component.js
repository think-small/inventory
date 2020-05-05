import React, { useState } from "react";
import "./card-input.styles.css";




const CardInputComponent = (props) => {

return (

<div className="outside_container" >      
  
<div style={{padding: "10px"}}> Make a New Lot: </div> 

<form  onSubmit={props.handleSubmit } >



<div className="containment" >
  <label className="top_label" >Lot</label>
  <input type="text"  name="Lot" onChange={ props.handleInputChange }     />
</div>

<div className="containment" >
  <label className="top_label" >Type </label>   
  <select onChange={props.handleInputChange}>
         <option name="Blue Caps" value="Blue Caps">
           Blue Caps
         </option>
         <option name="Pipette Tips" value="Pipette Tips">
           Pipette Tips
         </option>
  </select>
</div>

<div className="containment" > 
<label className="top_label">Quantity</label>          
  <input type="text"name="Quantity" onChange={props.handleInputChange} />
</div>


 
 

<div className="containment" >
<label className="top_label">Par</label>          
  <input type="text" name="par" onChange={props.handleInputChange}  />
</div>


<div className="containment" > 
<label className="top_label">Count Per Box</label>               
  <input type="text"name="countPerBox" onChange={props.handleInputChange} />
</div>


<div className="containment" > 
<label className="top_label">Expiration</label>     
  <input type="text"placeholder="YYYY-MM-DD" name="Expiration" onChange={props.handleInputChange} />
</div>

<div className="containment" >
   <label  >
     <input type="radio" name="isCurrentLot" value="isCurrentLot" onChange={props.handleChangeisCurrentLot} />
     Current Lot
   </label>
 </div>

 <div className="containment" >
   <label>
     <input type="radio" name="isNewLot" value="isNewLot" onChange={props.handleChangeisNewLot} />
     New Lot
   </label>
 </div>




<br></br>

<div style={{paddingBottom: "100px", margin: "20px" }}>
  <button className="submit_button" >Submit</button>
</div>


</form>


</div>



)
}

export default CardInputComponent;