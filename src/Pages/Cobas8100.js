import React from "react";

import Navbar from "../Navbar/Navbar";
import Tables from "../Table/Tables";
import Jumbotron1 from "../Jumbotron/Jumbotron"; 
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card"; 
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card_Input from "../Card_Input/Card_Input";

class Cobas8100 extends React.Component {
  state = {
    Name: "Blue Caps",
    Lot: "",
    Quantity: "",
    Expiration: "",
    isCurrentLot: false,
    isNewLot: false, 
    par: "", 
    countPerBox: "",



    Id: 0,
    Database: [],
    Transcations: [], 
    id: ""
  };

  componentWillMount() {
    fetch("api/8100")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);

        this.setState({ Database: myJson });
      });


      fetch("api/8100_all")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);

        this.setState({ Transcations: myJson });

        
      });



  }

  handleInputChange(event){
    const value = event.target.value;
    
    //the form must have a name that matches the name in the state
    const name = event.target.name;
    console.log(name);
    this.setState({
        [name]: value
    });
}

handleChangeisCurrentLot(event) {
  this.setState({isCurrentLot:true})
}
handleChangeisNewLot(event) {
  this.setState({isNewLot:true})
}


  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.Current_Name);
    //make a post into the database here

    var data = {
      Id: 0,
      Name: this.state.Name,
      Quantity: this.state.Quantity,
      isCurrentLot: this.state.isCurrentLot,
      isNewLot: this.state.isNewLot, 
      par: this.state.par, 
      countPerBox: this.state.countPerBox,
      Lot: this.state.Lot,
      Expiration: this.state.Expiration,

    };
    alert(data); 
    console.log(data);
    fetch("/api/post/8100", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
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

    event.preventDefault();
    event.target.reset(); //this will clear the form after you submit
  }



  handleUpdate(event) {
    event.preventDefault();

    //alert(typeof parseInt(event.target.value));
   //   alert(event.target.value);

   for(var x = 0; x<this.state.Database.length; x++) {
        //  console.log(parseInt(event.target.value));
          //    console.log(this.state.Database[x].id);
          
            if (parseInt(event.target.value)==this.state.Database[x].id) {
              
              //  alert(this.state.Database[x].Lot); 
            var na = this.state.Database[x].Lot; //gets the lot number
                  // alert(this.state.Database[x].Expiration_Date)   U WANT THE NEW VALUE FRON THE STATE THOUGH
          //  alert(this.state.Expiration) 
            // expiration: this.state.Expiration     
           
           if (this.state.Expiration==="") {
            var info = {Lot: na, Amount: this.state.Quantity, Expiration: this.state.Database[x].Expiration_Date}; 
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
               
              if (this.state.Quantity==="") {
                var info = {Lot: na, Amount: this.state.Database[x].Quantity, Expiration: this.state.Expiration}; 
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
    const data = { Quantity: this.state.Quantity, Id: event.target.value, Name: this.state.Name, Lot: this.state.Lot, Expiration: this.state.Expiration};
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

  
  }

  handleDelete(event) {
    event.preventDefault();
    //alert(event.target.value);
   // alert(event.target.value);

    // get the lot# from the db

    var Lot;
    for (var x = 0; x<this.state.Database.length; x++) {
     
      if (event.target.value==this.state.Database[x].id) {
         Lot = this.state.Database[x].Lot;
      }

    }
//alert(Lot); 

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

  render() {
    
    
    return (
      <div>
        
<Navbar />
<Jumbotron1 Title="Cobas 8100" />

    <Card_Input handleSubmit={()=>this.handleSubmit(event)} handleInputChange={()=> {this.handleInputChange(event)}} handleChangeisNewLot={()=>{this.handleChangeisNewLot(event)}} handleChangeisCurrentLot={()=>this.handleChangeisCurrentLot(event)}  />      
       
  
  
  <div style={{ display: "inline-block", paddingLeft: "10px"}}>

<Tables From_Database={this.state.Database} handleUpdate={() => {this.handleUpdate(event) }} 
handleInputChange= {() => this.handleInputChange(event)} handleDelete= {()=>this.handleDelete(event)}  />          

  <div>
         
         



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

{this.state.Transcations.length > 0 ? this.state.Transcations.map(items=> (
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
: <td>nothing yet</td>
}

</Table>
      </div> 
       
       
         </div>


        </div>
      </div>
    );
  }
}

export default Cobas8100;
