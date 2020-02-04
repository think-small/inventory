import React from "react";

class Cobas8100 extends React.Component {
    
    state = {
       
        Current_Name: 'Default', 
        Current_Quantity: 'Default',
        Id: 0, 
        Database:[]

    }
    
    componentWillMount() {
        fetch('api/8100')     
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          console.log(myJson);
        
      
          this.setState({Database:myJson});

        });
 }


 handleChangeName (event) {
  //console.log((event.target.value));
  // console.log(event.target.name); 
   this.setState({ Current_Name: event.target.value});
}
 handleChangeQuantity (event) {
  this.setState({ Current_Quantity: event.target.value})

 }

 handleSubmit(event) {
    event.preventDefault();
  //alert('A name was submitted: ' + this.state.Current_Name);
  //make a post into the database here


 var data = {
    Id: 0,
     Name: this.state.Current_Name,
     Quantity: this.state.Current_Quantity
 }
 console.log(data)
 fetch('/api/z', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
      Id: 0,
      Name: this.state.Current_Name,
      Quantity: this.state.Current_Quantity



     })
 })
 .then(function(response) {
     if (response.status >= 400) {
       throw new Error("Bad response from server");
     }
     return response.json();
     })
 .then(function(data) {
     console.log(data)    
     if(data == "success"){
        this.setState({msg: "Thanks for registering"});  
     }
 }).catch(function(err) {
     console.log(err)
 });
}
 



render() {
      return (
        <div>
        <div>
       

        </div>
        <div> Please Enter Values for the Cobas 8100</div>
   
     <form onSubmit={()=>{this.handleSubmit(event)}} method="POST"> 
     <label>
       Name: <input type="text" name='Name'value={this.state.value} onChange= {()=>{this.handleChangeName(event)}} />
       Quantity:  <input type="text" name='Quantity' value={this.state.value} onChange={()=>this.handleChangeQuantity(event)} />
     </label>
   
     <input type="submit" value="Submit" />
     </form>
     



       <hr></hr>

       <div> Values from the Database:(For testing purposes) </div>
       <div> {this.state.Database.map(items=><div>Id: {items.id} Name: {items.Name} Quantity: {items.Quantity}</div>)} </div>
      
</div>

      );
    }
  }
  










export default Cobas8100;
