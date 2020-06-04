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
            


// if there are any lots in the Cobas_Transactions that match what is in the Cobas_8100 table delete them too
    for (var x = 0; x<Cobas_8100.length; x++) {
               
    if (event.target.value==Cobas_8100[x].id) {
            var  Lot = Cobas_8100[x].lotNum;
            
               
                    
            var Lot_Number = {Lot: Lot}; 
                fetch("/api/delete/Cobas_8100_", {
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
                   

                  window.location.reload();
    


                }
            
              }

                
                }
    
    
    function  handleUpdate(event) {
                                
        for(var x = 0; x<Cobas_8100.length; x++) {
                   if (parseInt(event.target.value)==Cobas_8100[x].id) {
                       
                    
                      if (Expiration==="") {
                        var info = {Lot: Cobas_8100[x].lotNum, Amount: Quantity, Expiration: Cobas_8100[x].expirationDate}; 
                                fetch(`/Cobas_8100_Transactions`, {
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
             
                            
                                    if (data == "success") {
                                      console.log("thanks for submitting!");
                                    }
                                  })
                                  .catch(function(err) {
                                    console.log(err);
                                  });
                        
                                }
                        
                        // the opposite case- if the  quantity is empty then get the value from the database
         
                              if (Quantity==="") {
                                var info = {Lot: Cobas_8100[x].lotNum, Amount: Cobas_8100[x].quantity, Expiration: Expiration}; 
                                fetch(`/Cobas_8100_Transactions`, {
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
                         
                            
                                    if (data == "success") {
                                      console.log("thanks for submitting!");
                                    }
                                  })
                                  .catch(function(err) {
                                    console.log(err);
                                  });
                 }                
                                }    
                        
                              
                     
         
    
                   //}
                 
                   // if you don't type anyting in expiration then the value will be nothing 
                    const data = { Quantity: Quantity, Id: event.target.value, Name: Name, Lot: Cobas_8100[x].lotNum, Expiration: Expiration};
                   
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
    
    

                    }//end of the for loop
                  
                    }


return (



    <Tables From_Database={Cobas_8100} handleUpdate={() => {handleUpdate(event) }} 
    handleInputChange= {() => handleInputChange(event)} handleDelete= {()=>handleDelete(event)}  />          
         

    
)



}

export default Tables_main; 