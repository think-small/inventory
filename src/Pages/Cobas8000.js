import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card"; 
import ListGroup from "react-bootstrap/ListGroup";

const Cobas8000 = () => {

const [Cobas_8100, setdatabase] = useState([]);
const [Cobas_8100_Transactions, setdatabase1] = useState([]);

const [Name, setName] = useState("Blue Caps");
const [Lot, setLot] = useState("Lot"); 
const [Quantity, setQuantity] = useState(""); 
const [Expiration, setExpiration] = useState("");  
const [isCurrentLot, setisCurrentLot] = useState(false); 
const [isNewLot, setisNewLot] = useState(false); 
const [par, setpar] = useState("");
const [countPerBox, setCountPerBox] = useState("");


async function fetchData() {
    const res = await fetch("api/8100");
    res.json().then(res => setdatabase(res))
    .catch(err => console.log(err));
  
    const res1 = await fetch("api/8100_all");
    res1.json().then(res1 => setdatabase1(res1))
    .catch(err => console.log(err));
}

useEffect(()=> {
    fetchData(); 
})

const values = Cobas_8100.map(items=><div key={items.id}>{items.Lot}</div>)


return (
    <div>
        <Navbar />
        <div>Convert the Cobas8100 page into functional hooks.....</div>
        <div>{values}</div>
        <hr></hr>
    



       <div style={{padding: "10px"}}> <p>History of Expiration Date and Quantity(from join table)</p>
<Table striped bordered hover size="sm" >
  <thead>
    <tr>
      <th>Lot #</th>
    {/*  <th>Current Quantity(from Cobas8100 table)</th>    */}
       <th>Name</th>
      <th>Expiration Date</th>     
     
      <th>Amount Left</th>
      <th>Quantity</th>
      <th>Last Updated On:</th>
    </tr>
  </thead>


{Cobas_8100_Transactions.length > 0 ? Cobas_8100_Transactions.map(items=> (

  <tr key={items.id}>
      <td>{items.Lot}</td>
      <td>{items.Name}</td>
    {/* <td>{items.Quantity}</td> */}
       <td>{items.Expiration_Date.substring(0,10)}</td>
   
      <td>{items.Amount}</td>
      <td>{items.Quantity_In_Stock}</td>   
    
      <td>{items.Update_Time.substring(0,10)}   {items.Update_Time.substring(11,16)}</td>
    </tr> 
  
))
:
<td>nothing yet</td>
}


</Table>
</div>







</div>
)
}
export default Cobas8000;
