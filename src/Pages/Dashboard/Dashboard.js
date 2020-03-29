import React ,{useState, useEffect} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Navbar from "../../Navbar/Navbar"
import moment from "moment";

const Dashboard = () => {
  
  const [database, setdatabase] = useState([]);
  const [database1, setdatabase1] = useState([]);
 
  const current_time = moment().format("LT");
  const current_date = moment().format("LL");


    useEffect(
             ()=> {
           
           
            fetch("api/8100")
            .then(response => {
              return response.json();
            })
            .then(myJson => {
              console.log(myJson);
      
             setdatabase1(myJson);
            }).catch(err => console.log(err));
           
           
            const fetchData = async ()=> {
              const res = await fetch("/api/Cobas9", {credentials: 'include'});
              res.json().then(res => setdatabase(res))
              .catch(err => console.log(err));
            }
              
         fetchData();  
              },  [],
              )

              
const low_quantity =   database1.filter(items=>items.Quantity<100);  
const days_left =  database1.filter(items=>items.Time_Left<100);

  return (
    <div>
     
<Navbar/>

   
{database.length === 1 ? <h1 style={{padding:"30px"}}> {   database.map(item=> <div>Hello, {item.Username}</div>)} </h1> : <h1></h1>      }

<div style={{padding: "30px" , fontSize:"30px"}}>About to Expire or Low Quantity: </div>
<div style={{padding:"5px 30px"}}>Current Time: {current_date} {current_time}</div>


<hr></hr>

  {low_quantity.map(item=> 
      <Card
        bg="info"
        border="secondary"
        text="black"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px", 
          backgroundColor: "red"
         
        }}
      >
        <Card.Header>Lot#: {item.Lot}</Card.Header>
        <Card.Body>
          <Card.Title>Quantity Left: {item.Quantity}</Card.Title>
          <Card.Text>
        Low Quantity Please Update
          </Card.Text>
        </Card.Body>
      </Card>
)}
      
      {days_left.map(item=> 
      <Card
        bg="warning"
        border="secondary"
        text="black"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px", 
         
        }}
      >
        <Card.Header>Lot#: {item.Lot}</Card.Header>
        <Card.Body>
          <Card.Title>Days Left: {item.Time_Left}</Card.Title>
          <Card.Text>
          About to Expire please Update
          </Card.Text>
        </Card.Body>
      </Card>
)}  
    
    {database.length===0 ? <h1>Nothing Yet-(log in to the server to see)</h1> : <div></div>}
      
    </div>

    
  );
};

export default Dashboard;
