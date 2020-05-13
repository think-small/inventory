import React, {useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import Tables from "./Tables"




const Tables_main = ()=> {

    const [Cobas_8100, setdatabase] = useState([]);

    
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
    
    
    useEffect(
      
      ()=> {
      fetch("api/8100")
          .then(response => {
            return response.json();
          })
          .then(myJson => {
            console.log(myJson);
    
           setdatabase(myJson);
          }).catch(err => console.log(err));
    
          

            }, [],
            )
    
    function handleDelete(event) {
              event.preventDefault();
        
          
              var Lot;
              for (var x = 0; x<Cobas_8100.length; x++) {
               
                if (event.target.value==Cobas_8100[x].id) {
                   Lot = Cobas_8100[x].Lot;
                }
          
              }

          
              var data = { Id: event.target.value }; //gets the current id of the lot (which happens to be from the database)
          
              fetch("/api/delete/8100", {
                method: "delete",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
              })
                .then(response => response.json())
                .then(function(data) {
                  //  alert(data);
          
                  if (data == "success") {
                    console.log("thanks for submitting!");
                  }
                })
                .catch(function(err) {
                  console.log(err);
                });
            
          
            var Lot_Number = {Lot: Lot}; 
                fetch("/api/delete/8100_Transactions", {
                  method: "delete",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(Lot_Number)
                })
                  .then(response => response.json())
                  .then(function(data) {
                    //  alert(data);
            
                    if (data == "success") {
                      console.log("thanks for submitting!");
                    }
                  })
                  .catch(function(err) {
                    console.log(err);
                  });
                   }
    
    
    function  handleUpdate(event) {
                
                
                   for(var x = 0; x<Cobas_8100.length; x++) {
                    
                          
                            if (parseInt(event.target.value)==Cobas_8100[x].id) {
                              
                                
                            var databaseLot = Cobas_8100[x].lotNum; //gets the lot number from the database
                
                       
                   // if the expiration value is empty then get the value from the database
                         if (Expiration==="") {
                            var info = {Lot: databaseLot, Amount: Quantity, Expiration: Cobas_8100[x].expirationDate}; 
                                fetch(`/api/post/8100_Transactions`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(info)
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
                                }
                        
                        // if the (Amount?) quantity is empty then get the value from the database        
                              if (Quantity==="") {
                                var info = {Lot: databaseLot, Amount: Cobas_8100[x].quantity, Expiration: Expiration}; 
                                fetch(`/api/post/8100_Transactions`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(info)
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
                 }                
                                }    
                        
                              }
                     
         
    
                   //}
                      /** when you do a put command it updates everything, you may want insert???? */
                    const data = { Quantity: Quantity, Id: event.target.value, Name: Name, Lot: Lot, Expiration: Expiration};
                    fetch("api/update/8100", {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(data)
                    })
                      .then(response => response.json())
                      .then(data => {
                        console.log("Success:", data);
                      })
                      .catch(error => {
                        console.error("Error:", error);
                      });
                       
                
    
                      event.preventDefault();
                      // event.target.reset();
                      window.location.reload();
    
    
    
                  
                    }


return (

<div style={{paddingTop: "100px", paddingBottom: "100px",  borderBottomStyle: "ridge"}} >
  <div>your input table</div>
    <Tables From_Database={Cobas_8100} handleUpdate={() => {handleUpdate(event) }} 
    handleInputChange= {() => handleInputChange(event)} handleDelete= {()=>handleDelete(event)}  />          
</div>           

    
)



}

export default Tables_main; 