import React ,{useState, useEffect} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import "./styles.css";
import Navbar from "../../Navbar/Navbar"
import moment from "moment";

const Dashboard = () => {
  
  const [database, setdatabase] = useState([]);
 
  const current_time = moment().format("LT");
  const current_date = moment().format("LL");


    useEffect(
             ()=> {
  
            const fetchData = async ()=> {
              const res = await fetch("/api/Cobas9", {credentials: 'include'});
              res.json().then(res => setdatabase(res))
              .catch(err => console.log(err));
            }
              
            fetchData();  
              },  [],
              )


function logout () {
  fetch("/logout")
  .then(response => {
    return response.status; 
  })
  .catch(err => console.log(err));
}
  
  
  
  
  return (
    <div>
     
<Navbar/>

   
{database.length === 1 ? <h1 style={{padding:"50px 30px 10px"}}> {   database.map(item=> <div>Hello, {item.Username}</div>)} </h1> : <h1></h1>      }

<div style={{padding:"10px 30px"}}>Current Time: {current_date} {current_time}</div>


      <Card
        bg="dark"
        text="white"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px"
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
          Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card
        bg="dark"
        text="white"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px"
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <Card
        bg="dark"
        text="white"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "30px"
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    
    
      <Card
        bg="dark"
        text="white"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "20px"
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      
      <Card
        bg="dark"
        text="white"
        style={{
          width: "18rem",
          display: "inline-block",
          padding: "30px",
          margin: "30px"
        }}
      >
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    
    
    
    
    </div>

    
  );
};

export default Dashboard;
