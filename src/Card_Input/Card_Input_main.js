import React, { useState } from "react";
import Card_Input from "./Card_Input";

function Card_Input_main (props) {



const [Name, setName] = useState("Blue Caps");
const [Lot, setLot] = useState("Lot"); 
const [Quantity, setQuantity] = useState(""); 
const [Expiration, setExpiration] = useState("");  
const [isCurrentLot, setisCurrentLot] = useState(false); 
const [isNewLot, setisNewLot] = useState(false); 
const [par, setpar] = useState("");
const [countPerBox, setCountPerBox] = useState("");

function handleInputChange (event) {
  const value = event.target.value;
    
  //the form must have a name that matches the name in the state
  const name = event.target.name;

  console.log("name" + " " + name + " " + " value:" +  value);
  console.log(name)
// consider all the situations  
if (value=="Pipette Tips") {

  setName(value);
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
}

function handleChangeisNewLot (event) {
  const value = event.target.value;
    
  //the form must have a name that matches the name in the state
  const name = event.target.name;
  console.log("name" + " " + name + " " + " value:" +  value);
  if (value=="isNewLot") {
    setisNewLot(true);
  }

}

function handleChangeisCurrentLot(event) {
  const value = event.target.value;
    
  //the form must have a name that matches the name in the state
  const name = event.target.name;
  console.log("name" + " " + name + " " + " value:" +  value);
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
    Expiration: Expiration,

  };
  console.log(data);


 // ***in the future use the prop to change the fetch route...to make customizable routes but using this same component
console.log(props.route); 

  fetch("/api/post/8100", {
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
      //  alert(data);

      if (data == "success") {
        console.log("thanks for submitting!");
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  event.preventDefault();
  event.target.reset(); //this will clear the form after you submit
}



return (
    <div>
        <Card_Input 
        handleSubmit={()=>handleSubmit()}
        handleInputChange={()=> handleInputChange(event)} 
        handleChangeisNewLot={()=>{handleChangeisNewLot(event)}}
        handleChangeisCurrentLot={()=>handleChangeisCurrentLot(event)} 
        />      
    </div>
)
}
export default Card_Input_main;
