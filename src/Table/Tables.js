import React from 'react';
import Table from "react-bootstrap/Table";



const Tables = (props)=> {

     const Database = props.From_Database;   //get the values from the Database

    return (
   
<div style={{padding: "10px"}} >
        <Table striped bordered hover size="lg" >
        <thead>
          <tr>  
            <th>Lot #</th>
            <th>Name</th>
          
            <th>Expiration Date</th>
            <th>Days Left To Expiration</th>
             <th>Warning</th>
             <th>Quantity</th>
           
            <th>Lot Created On</th>
            <th>Delete</th>
          </tr>
        </thead> 
         <tbody>
        {Database.map(items=> (  
          <tr>
            <td>{items.Lot} </td>
            <td>{items.Name}</td>
            <td><div>{items.Expiration_Date.substring(0,10) }
            
            <form
                         onSubmit={
                           props.handleUpdate
                         }
                         method="POST"
                       >
                         <label>
                           Update Expiration Date: 
                           <input
                             type="text"
                             name="Expiration"
                             placeholder="YYYY-MM-DD"
                             value={items.value}
                       
                             onChange={
                             props.handleChangeExpiration}
                             
                           />
                         </label>
                
                       </form>
         
             <button
                     
                     value={items.id}
                     onClick={
                       props.handleUpdate
                     }
                   >
                     Update Date
                   </button>
             
             
             </div></td>
            <td>{items.Time_Left}</td>
        
        
        
          <td>{items.Warning}</td>
         
            <td><div>
                   {" "}
                   {items.Quantity <= 100 ? (
                     <div style={{ color: "red" }}>
                       {" "}
                      {items.Quantity} Left
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
                       
                             onChange={
                             props.handleChangeQuantity}
                             
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
             
                
             
             <td>{items.Date.substring(0,10)} {items.Date.substring(11,16)}</td>
            <td> <button onClick={props.handleDelete}  value={items.id} > Delete Lot </button>                    </td>
            </tr>
          ))}
        </tbody> 
      </Table>


</div>






    )
}
 
export default Tables; 