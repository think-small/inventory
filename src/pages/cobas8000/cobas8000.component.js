import React, {useEffect, useState }from "react";
import NavbarComponent from "../../components/navbar/navbar.component";
import moment from "moment";



const Cobas8000Component = () => {


  const [Name, setName] = useState("Blue Caps");
  const [Lot, setLot] = useState("Lot"); 
  const [Quantity, setQuantity] = useState(""); 
  const [Expiration, setExpiration] = useState("");  
  const [isCurrentLot, setisCurrentLot] = useState(false); 
  const [isNewLot, setisNewLot] = useState(false); 
  const [par, setpar] = useState("");
  const [countPerBox, setCountPerBox] = useState("");
  const [OrderID, setOrderID] = useState("");
  const [instrument, setInstrument] = useState(""); 
  
  function handleInputChange (event) {
    const value = event.target.value;
      
    //the form must have a name that matches the name in the state
    const name = event.target.name;
  
   console.log("name " + " " + name + " " + " value: " +  value);

  if(value=="Abl") {
    setInstrument(value)
  }
  if(value=="Architect") {
    setInstrument(value)
  } 
  if(value=="Cobas_8000") {
    setInstrument(value)
  } 
  if(value=="8100") {
    setInstrument(value)
  }

  //for Cobas 8100
  if (value==="Pipette Tips" || value==="Blue Caps") {
  
    setName(value);
  }
  //for Abl
  if (value==="Calibration Solution" || value==="Gas Cylinder" || value==="Rinse Solution" || value==="Waste Bucket") {
    setName(value);
  }
  //for the Architect
  if (value==="Concentrated Wash Buffer" || value==="Hepatitis B Surface Antigen Reagent" || 
  value==="Hepatitis B Surface Antigen Neutralization Reagent" || value==="Hepatitis C Antibody Reagent" ||
  value==="Troponin I Reagent"  ||value==="Pre Trigger Solution ") {
    setName(value)
  }


  if (name==="Lot") {
    setLot(value);
  }
  if (name==="Expiration") {
    setExpiration(value);
  }
  if (name==="Quantity") {
    setQuantity(value);
  }
  if (name=="par") {
    setpar(value); 
  }
  if (name=="countPerBox") {
    setCountPerBox(value);
  }
  if (name==="orderID") {
    setOrderID(value);
  }
  
  }
  
  function handleChangeisNewLot (event) {
    const value = event.target.value;
      

    const name = event.target.name;
   // console.log("name" + " " + name + " " + " value:" +  value);
    if (value=="isNewLot") {
      setisNewLot(true);
    }
  
  }
  
  function handleChangeisCurrentLot(event) {
    const value = event.target.value;
      
    //the form must have a name that matches the name in the state
    const name = event.target.name;
  //  console.log("name" + " " + name + " " + " value:" +  value);
    if (value=="isCurrentLot") {
      setisCurrentLot(true);
    }
  
  }
  
  function handleSubmit(event) {
  
    var data = {
      Id: 0,
      Name: Name,
      Quantity: Quantity,
      isCurrentLot: isCurrentLot,
      isNewLot: isNewLot, 
      par: par, 
      countPerBox: countPerBox,
      Lot: Lot,
      Expiration: new moment(Expiration).format("YYYY-MM-DD HH:mm:ss"),
      OrderID: OrderID
  
    };
   //  console.log(data);
    // the value of instrument comes from the handle submit
  //  alert(instrument)
  //alert(Name);
    fetch("/api/post/"+instrument, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
  
      .then(function(data) {
        if (data == "success") {
          console.log("thanks for submitting!");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  


 
    event.preventDefault();
    event.target.reset(); //this will clear the form after you submit
     // setName(""); // clear the name each time 
  }
     
                   
return (

<div>
<NavbarComponent />



<div className="outside_container" >      
  
<div style={{padding: "10px"}}> Add a new Lot for Abl, Architect or Cobas8100 (a work in progress): </div> 

<form  onSubmit={handleSubmit } >

<div className="containment" >
  <label className="top_label" >Instrument Type </label>   
  <select onChange={handleInputChange}>
        <option name="" value="">
           
         </option>
         <option name="Abl" value="Abl">
           Abl
         </option>
         <option name="Architect" value="Architect">
           Architect
         </option>
       
         <option name="8100" value="8100">
           Cobas 8100
         </option>

  </select>
</div>








<div className="containment" >
  <label className="top_label" >Lot</label>
  <input type="text"  name="Lot" onChange={ handleInputChange }     />
</div>


{ instrument==='' &&
<div className="containment" >
  <label className="top_label" >Type: </label> 

  <select onChange={handleInputChange}>
  </select> 
</div>
}     

{ instrument==='Abl' &&
<div className="containment" >
  <label className="top_label" >Type: </label> 

  <select onChange={handleInputChange}>
  <option value="">
   
  </option>
  <option value="Calibration Solution">
    Calibration Solution 
  </option>
  <option value="Gas Cylinder">
   Gas Cylinder
  </option>
  <option  value="Rinse Solution">
   Rinse Solution 
  </option>
  <option  value="Waste Bucket">
   Waste Bucket
  </option>

</select> 
</div>
}       

{ instrument==='Architect' &&
  <div className="containment" >
  <label className="top_label" >Type: </label> 
<select onChange={handleInputChange}>
<option value="">
   
   </option>



<option value="Concentrated Wash Buffer">
  Concentrated Wash Buffer
</option>
<option value= "Hepatitis B Surface Antigen Reagent">
 Hepatitis B Surface Antigen Reagent
</option>

<option  value="Hepatitis B Surface Antigen Neutralization Reagent">
 Hepatitis B Surface Antigen Neutralization Reagent
</option>
<option  value="Hepatitis C Antibody Reagent">
 Hepatitis C Antibody Reagent
</option>
<option  value="Troponin I Reagent">
  Troponin I Reagent
</option>
<option  value="Pre Trigger Solution">
  Pre Trigger Solution 
</option>


</select>
</div>
}

{ instrument==='8100' &&
  <div className="containment" >
  <label className="top_label" >Type: </label> 
<select onChange={handleInputChange}>
<option value="">
   
   </option>
<option value="Blue Caps">
 Blue Caps
</option>
<option  value="Pipette Tips">
 Pipette Tips
</option>
</select>
</div>
}



<div className="containment" > 
<label className="top_label">Quantity</label>          
  <input type="text"name="Quantity" onChange={handleInputChange} />
</div>


 

<div className="containment" >
<label className="top_label">Par</label>          
  <input type="text" name="par" onChange={handleInputChange}  />
</div>

<div className="containment" > 
<label className="top_label">Count Per Box</label>               
  <input type="text"name="countPerBox" onChange={handleInputChange} />
</div>

<div className="containment" > 
<label className="top_label">Expiration</label>     
  <input type="text"placeholder="YYYY-MM-DD" name="Expiration" onChange={handleInputChange} />
</div>

 <div className="containment" > 
<label className="top_label">Order Id</label>          
  <input type="text"name="orderID" onChange={handleInputChange} />
</div>

<div className="containment" >
   <label  >
     <input type="radio" name="isCurrentLot" value="isCurrentLot" onChange={handleChangeisCurrentLot} />
     Current Lot
   </label>
 </div>

 <div className="containment" >
   <label>
     <input type="radio" name="isNewLot" value="isNewLot" onChange={handleChangeisNewLot} />
     New Lot
   </label>
 </div>





<div style={{paddingBottom: "100px", margin: "20px" }}>
  <button className="submit_button" >Submit</button>
</div>


</form>


</div>










</div>










);
};
export default Cobas8000Component;
