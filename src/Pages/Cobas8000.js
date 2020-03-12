import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Table from "react-bootstrap/Table";
import Card_Input_main from "../Card_Input/Card_Input_main"; 



//when i use the fetch functions they keep on calling themselves repeatdly why?????? is this a react bug? 
const Cobas8000 = () => {


  //should not call itself more than once, but it is why????
  const sayHI = ()=> {
    console.log('should not call itselft more than once')
  }
  sayHI();



const [Cobas_8100, setdatabase] = useState([]);
const [Cobas_8100_Transactions, setdatabase1] = useState([]);

/** 
const fetchData = ()=> {
  fetch("api/8100")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);

       setdatabase(myJson);
      }).catch(err => console.log(err));

 }


const fetchData1 = async ()=> {
    const res = await fetch("api/8100_all");
    res.json().then(res => setdatabase1(res))
    .catch(err => console.log(err));
  }
*/
useEffect(()=> {
  fetch("api/8100")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);

       setdatabase(myJson);
      }).catch(err => console.log(err));
}, [],

()=> {
fetch("api/8100_all")
.then(response => {
  return response.json();
})
.then(myJson => {
  console.log(myJson);

 setdatabase1(myJson);
}).catch(err => console.log(err))
}, [],


)

//const values = Cobas_8100.map(items=><div key={items.id}>{items.Lot}</div>)

return (

    <div>
        <Navbar />
        <div>Convert the Cobas8100 page into functional hooks.....use this page as a code "playground" for now</div>

        
  <div style={{padding: "10px"}}> <p>History of Expiration Date and Quantity(from join table)</p>
<Table striped bordered hover size="sm" >
  <thead>
    <tr>
      <th>Lot #</th>
      <th>Current Quantity(from Cobas8100 table)</th>    
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
     <td>{items.Quantity}</td> 
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



<Card_Input_main route="whatever-change-in-the-future" />




</div>
);
};
export default Cobas8000;
