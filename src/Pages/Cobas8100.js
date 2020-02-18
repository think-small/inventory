import React from "react";

import Navbar from "../Navbar/Navbar";
import Tables from "../Table/Tables";
import Jumbotron1 from "../Jumbotron/Jumbotron"; 

class Cobas8100 extends React.Component {
  state = {
    Name: "Blue Caps",
    Lot: "",
    Quantity: "",
    Expiration: "",

    Id: 0,
    Database: [],
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
    // alert('coming soon, update into the database');
    // alert(this.state.Quantity);
    // alert(event.target.value);  //get the Id (from the button )

    const data = { Quantity: this.state.Quantity, Id: event.target.value };
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
            <Tables From_Database={this.state.Database} handleUpdate={() => {this.handleUpdate(event) }} 
             handleChangeQuantity= {() => this.handleChangeQuantity(event)}
            handleDelete= {()=>this.handleDelete(event)}  />          
        <div>
         
         
         </div>


        </div>
      </div>
    );
  }
}

export default Cobas8100;
