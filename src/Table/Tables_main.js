import React, {useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import Tables from "./Tables"




const Tables_main = ()=> {

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
    
          const fetchData1 = async ()=> {
            const res = await fetch("api/8100_all");
            res.json().then(res => setdatabase1(res))
            .catch(err => console.log(err));
          }
              fetchData1(); 
       
       
       
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
                              
                        
                            var na = Cobas_8100[x].Lot; //gets the lot number
                   
                       
                         if (Expiration==="") {
                            var info = {Lot: na, Amount: Quantity, Expiration: Cobas_8100[x].Expiration_Date}; 
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
                           
                              if (Quantity==="") {
                                var info = {Lot: na, Amount: Cobas_8100[x].Quantity, Expiration: Expiration}; 
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
    <div style={{ display: "inline-block", paddingLeft: "10px"}}>

    <Tables From_Database={Cobas_8100} handleUpdate={() => {handleUpdate(event) }} 
    handleInputChange= {() => handleInputChange(event)} handleDelete= {()=>handleDelete(event)}  />          
           
    </div>
    
)



}

export default Tables_main; 