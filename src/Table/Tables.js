import React from 'react';
import Table from "react-bootstrap/Table";



const Tables = (props)=> {

     const Database = props.From_Database;   //get the values from the Database

    return (
   
<div style={{padding:"20px"}} >
        <div>The Cobas 8100 Table</div>
        <Table striped bordered hover   responsive >
        <thead>
          <tr>  
            <th>Lot #</th>
            <th>Type (displayName in sql table)</th>
          
            <th>Expiration Date</th>
            <th>Days Left </th>
             <th>Warning</th>
             <th>Quantity</th>
             <th>isCurrentLot</th>
              <th>isNewLot</th>
              <th>par</th>

              <th>CountBox</th>
              <th>Order Id</th>
            <th>Lot Created On</th>
  <th>Delete</th>
          </tr>
        </thead> 
    
        {Database.map(items=> (  
          <tr key={items.id}>
            <td>{items.lotNum} </td>
            <td>{items.displayName}</td>
            <td  style={{wordWrap: "break-word", minWidth: "160px", maxWidth: "160px"}}><div>{items.expirationDate.substring(0,10) }
            
            <form
                         onSubmit={
                           props.handleUpdate
                         }
                         method="POST"
                       >
                         <label>
                           Update Date: 
                           <input
                            style={{width: "120px"}}
                             type="text"
                             name="Expiration"
                             placeholder="YYYY-MM-DD"
                             value={items.value}
                       
                             onChange={
                             props.handleInputChange}
                             
                           />
                         </label>
                
                       </form>
         
             <button
                     
                     value={items.id}
                     onClick={
                       props.handleUpdate
                     }
                   >
                     Update
                   </button>
             
             
             </div></td>
            <td>{items.timeLeft}</td>
        
        
        
          <td>{items.warning}</td>
         
          <td  style={{wordWrap: "break-word", minWidth: "160px", maxWidth: "160px"}}>
              <div>
                   {" "}
                   {items.quantity <= 1000 ? (
                     <div style={{ color: "red" }}>
                       {" "}
                      {items.quantity} Left
                       <form
                         onSubmit={
                           props.handleUpdate
                         }
                         method="POST"
                       >
                         <label>
                           Update Quantity:
                           <input
                            style={{width: "130px"}}
                             type="text"
                             name="Quantity"
                             value={items.value}
                       
                             onChange={
                             props.handleInputChange}
                             
                           />
                         </label>
                
                       </form>
                       <button
                     
                         value={items.id}
                         onClick={
                           props.handleUpdate
                         }
                       >
                         Update 
                       </button>
                     </div>
                   ) : (
                     <div>  {items.quantity} </div>
                   )}{" "}
                 </div></td>
             
                <td>{items.isCurrentLot=='1'? 'true': 'false'}</td>
                 <td>{items.isNewLot=='1'? 'true': 'false'}</td> 
                 <td>{items.par}</td>
                 <td>{items.countPerBox}</td>  
                 <td>{items.orderID} </td>
             <td>{items.date.substring(0,10)} {items.date.substring(11,16)}</td>
         

           <td> <button onClick={props.handleDelete}  value={items.id} > Delete </button>    
                          </td>


            </tr>
          ))}

      </Table>


</div>






    )
}
 
export default Tables; 