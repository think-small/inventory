import React from 'react';
import Table from "react-bootstrap/Table";



const Tables = (props)=> {

     const Database = props.From_Database;   //get the values from the Database

    return (
   
<div >
        <Table striped bordered hover   responsive >
        <thead>
          <tr>  
            <th>Lot #</th>
            <th>Name</th>
          
            <th>Expiration Date</th>
            <th>Days Left </th>
             <th>Warning</th>
             <th>Quantity</th>
             <th>isCurrentLot</th>
              <th>isNewLot</th>
              <th>par</th>
              <th>CountBox</th>
            <th>Lot Created On</th>
  <th>Delete</th>
          </tr>
        </thead> 
    
        {Database.map(items=> (  
          <tr key={items.id}>
            <td>{items.Lot} </td>
            <td>{items.Name}</td>
            <td  style={{wordWrap: "break-word", minWidth: "160px", maxWidth: "160px"}}><div>{items.Expiration_Date.substring(0,10) }
            
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
            <td>{items.Time_Left}</td>
        
        
        
          <td>{items.Warning}</td>
         
          <td  style={{wordWrap: "break-word", minWidth: "160px", maxWidth: "160px"}}>
              <div>
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
                     <div>  {items.Quantity} </div>
                   )}{" "}
                 </div></td>
             
                <td>{items.isCurrentLot=='1'? 'true': 'false'}</td>
                 <td>{items.isNewLot=='1'? 'true': 'false'}</td> 
                 <td>{items.par}</td>
                 <td>{items.countPerBox}</td>  
             <td>{items.Date.substring(0,10)} {items.Date.substring(11,16)}</td>
         

           <td> <button onClick={props.handleDelete}  value={items.id} > Delete </button>    
                          </td>


            </tr>
          ))}

      </Table>


</div>






    )
}
 
export default Tables; 