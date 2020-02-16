import React from "react";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

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
    const current_time = moment().format("LT");
    const current_date = moment().format("L");

    return (
      <div>
        <Navbar />
        <div> Cobas 8100 Inventory</div>
        <div>
          <i>
            Current Local Time: {current_date} {current_time}
          </i>{" "}
        </div>
        <div>Please enter new values for Inventory</div>
        <form
          onSubmit={() => {
            this.handleSubmit(event);
          }}
          method="POST"
        >
          <label>
            Lot #:{" "}
            <input
              type="text"
              name="Lot"
              value={this.state.value}
              onChange={() => this.handleChangeLot(event)}
            />
            <label>
              Inventory Type:
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
            </label>
            Quantity:{" "}
            <input
              type="text"
              name="Quantity"
              value={this.state.value}
              onChange={() => this.handleChangeQuantity(event)}
            />
            Expiration Date:{" "}
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              name="Expiration"
              value={this.state.value}
              onChange={() => this.handleChangeExpiration(event)}
            />
          </label>

          <input type="submit" value="Update" style={{ margin: "5px" }} />
        </form>

        <hr></hr>

        <div> Current values from the mySQL Database: </div>

        <hr></hr>

        <div>
          {" "}
          {this.state.Database.map(items => (
            <div
              style={{
                border: "2px solid black",
                margin: "10px",
                padding: "10px"
              }}
            >
              <div>Lot #: {items.Lot} </div>
              <div>
                {" "}
                {items.Name == "Blue Caps" ? (
                  <div style={{ color: "blue" }}>{items.Name}</div>
                ) : (
                  <div>{items.Name} </div>
                )}{" "}
              </div>
              <div>
                {" "}
                {items.Quantity <= 20 ? (
                  <div style={{ color: "red" }}>
                    {" "}
                    **Low Quantity** Only {items.Quantity} Left
                    <form
                      onSubmit={() => {
                        this.handleUpdate(event);
                      }}
                      method="POST"
                    >
                      <label>
                        Update Quantity:
                        <input
                          type="text"
                          name="Quantity"
                          value={this.state.value}
                          onChange={() => this.handleChangeQuantity(event)}
                        />
                      </label>
                    </form>
                    <button
                      style={{ marginLeft: "5px" }}
                      value={items.id}
                      onClick={() => {
                        this.handleUpdate(event);
                      }}
                    >
                      Update Quantity
                    </button>
                  </div>
                ) : (
                  <div> Quantity: {items.Quantity} </div>
                )}{" "}
              </div>
              <div style={{ color: "green" }}>
                Expiration Date: {items.Expiration_Date}{" "}
              </div>
              Date Submitted: {items.Date}
              <button
                style={{ marginLeft: "5px", float: "right" }}
                onClick={() => {
                  this.handleDelete(event);
                }}
                value={items.id}
              >
                Delete Lot
              </button>
              {/**     <button style={{marginLeft: '5px',  float: 'right'}} onClick={()=>{this.handleUpdate(event)} }>Update Lot</button>
               */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Cobas8100;
