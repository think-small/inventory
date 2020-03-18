import React,  {useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";


const Tables2 = () => {


    const [Cobas_8100_Transactions, setdatabase1] = useState([]);
    
    
    useEffect(
  
        ()=> {
      
      
            const fetchData1 = async ()=> {
              const res = await fetch("api/8100_all");
              res.json().then(res => setdatabase1(res))
              .catch(err => console.log(err));
            }
                fetchData1(); 
         
         
         
              }, [],
              )



return (






<div> <p>History of Expiration Date and Quantity(from join table)</p>
<Table striped bordered hover >
  <thead>
    <tr>
      <th>Lot #</th>
    
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



)
}


export default Tables2; 