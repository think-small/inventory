import React from 'react';
import Table from "react-bootstrap/Table";



const Tables = (props)=> {

     const Database = props.From_Database;   //get the values from the Database

    return (
   
<div style={{padding: "10px"}} >
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Lot</th>
            <th>Expiration Date</th>
            <th>Quantity</th>
            <th>Submission Time</th>
            <th>Delete</th>
          </tr>
        </thead> 
         <tbody>
        {Database.map(items=> (  
          <tr>
            <td>{items.Name}</td>
            <td>{items.Lot}</td>
            <td>{items.Expiration_Date}</td>
         
         
            <td><div>
                   {" "}
                   {items.Quantity <= 20 ? (
                     <div style={{ color: "red" }}>
                       {" "}
                       **Low Quantity** Only {items.Quantity} Left
                       <form
                         onSubmit={
                           props.handleUpdate
                         }
                         method="POST"
                       >
                         <label>
                           Update Quantity:
                           <input
                             type="text"
                             name="Quantity"
                             value={items.value}
                             onChange={props.handleChangeQuantity}
                           />
                         </label>
                
                       </form>
                       <button
                     
                         value={items.id}
                         onClick={
                           props.handleUpdate
                         }
                       >
                         Update Quantity
                       </button>
                     </div>
                   ) : (
                     <div>  {items.Quantity} </div>
                   )}{" "}
                 </div></td>
             
                
             
             <td>{items.Date}</td>
            <td> <button onClick={props.handleDelete}  value={items.id} > Delete Lot </button>                    </td>
            </tr>
          ))}
        </tbody> 
      </Table>


</div>






    )
}
 
export default Tables; 