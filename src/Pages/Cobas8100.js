import React from "react";

import Navbar from "../Navbar/Navbar";
import Tables from "../Table/Tables";
import Jumbotron1 from "../Jumbotron/Jumbotron"; 
import Table from "react-bootstrap/Table";

class Cobas8100 extends React.Component {
  state = {
    Name: "Blue Caps",
    Lot: "",
    Quantity: "",
    Expiration: "",

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

  handleChangeName(event) {
    // console.log((event.target.value));
    // console.log(event.target.name);
    this.setState({ Name: event.target.value });
  }
  handleChangeQuantity(event) {
    this.setState({ Quantity: event.target.value });
  
  }

  handleChangeLot(event) {
    this.setState({ Lot: event.target.value });
  }
  handleChangeExpiration(event) {
    this.setState({ Expiration: event.target.value });
  }


  // add a new lot number into the transactions table
  addTransactions(event) {
  //  alert(event.target.value);
    
    var data = {Lot: event.target.value};

    fetch(`/api/post/8100_Transactions`, {
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



   }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.Current_Name);
    //make a post into the database here

    var data = {
      Id: 0,
      Name: this.state.Name,
      Quantity: this.state.Quantity,
      Lot: this.state.Lot,
      Expiration: this.state.Expiration
    };
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


   for(var x = 0; x<this.state.Database.length; x++) {
        //  console.log(parseInt(event.target.value));
          //    console.log(this.state.Database[x].id);
            if (parseInt(event.target.value)==this.state.Database[x].id) {
              
              //  alert(this.state.Database[x].Lot);  //okay now yyou have the lot 
            var na = this.state.Database[x].Lot;

            var info = {Lot: na, Amount: this.state.Database[x].Quantity}; 
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
  }

  render() {

    
    return (
      <div>
        <Navbar />

        <Jumbotron1 Title="Cobas 8100" />
         
     
     
        <div style={{padding: "20px", margin: "10px"}}>Add a New Lot:
        <form onSubmit={() => { this.handleSubmit(event);  }} method="POST" >
            <input style={{margin: "10px", borderRadius: "1px"} }
              type="text"
              name="Lot"
              value={this.state.value}
              onChange={() => this.handleChangeLot(event)}
              placeholder= "Lot Number"
            />

          
        
              <select
                value={this.state.value}
                onChange={() => {
                  this.handleChangeName(event);
                }}
              >
                <option name="Name" value="Blue Caps">
                  Blue Caps
                </option>
                <option name="Name" value="Pipette Tips">
                  Pipette Tips
                </option>
              </select>


 
            <input
            style={{margin: "10px", borderRadius: "1px"} }
              type="text"
              name="Quantity"
              value={this.state.value}
              onChange={() => this.handleChangeQuantity(event)}
              placeholder="Quantity"
            />
            Expiration Date:{" "}
            <input
            style={{margin: "10px", borderRadius: "1px"} }
              type="text"
              placeholder="mm/dd/yyyy"
              name="Expiration"
              value={this.state.value}
              onChange={() => this.handleChangeExpiration(event)}
            />


          <input type="submit" value="Update" style={{ borderRadius: "1px" }} />
        </form>

       </div>
       
      <hr></hr>
   



        <div>
               <div style={{padding: "20px"}}> Values from the Database: </div>
            <Tables From_Database={this.state.Database} addTransactions = {()=>{this.addTransactions(event)}}handleUpdate={() => {this.handleUpdate(event) }} 
             handleChangeQuantity= {() => this.handleChangeQuantity(event)}
            handleDelete= {()=>this.handleDelete(event)}  />          
        <div>
         





         <p>from the join table....Transaction History </p>
         <hr></hr>
<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Lot #</th>
      <th>Current Quantity (value from Cobas8100 table)</th>
      <th>Name</th>
      <th>(Transaction History) Amount</th>
      <th>(Transaction) Quantity</th>
      <th>Update time</th>
    </tr>
  </thead>
  <tbody>
{this.state.Transcations.map(items=> (
  <tr>
      <td>{items.Lot}</td>
      <td>{items.Quantity}</td>
      <td>{items.Name}</td>
      <td>{items.Amount}</td>
      <td>{items.Quantity_In_Stock}</td>
      <td>{items.Update_Time}</td>
    </tr>
))}
  </tbody>
</Table>
       
       
       
         </div>


        </div>
      </div>
    );
  }
}

export default Cobas8100;
