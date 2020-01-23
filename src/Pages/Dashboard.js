import React, { useContext } from "react";
import { ItemsContext } from "../Pages/Contexts/ItemsContext";
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

const Dashboard = () => {
  const { items } = useContext(ItemsContext);
  return (
    <div>
    <section>
      Testing to ensure ItemsContext is properly passing data to children.
      <ul>
        {items.map(item => (
          <li
            key={item.orderID}
          >{`Name: ${item.name} Lot: ${item.lotNum} Expiration: ${item.expirationDate}`}</li>
        ))}
      </ul>
    </section>


<Nav
  activeKey="/home"
  onSelect={selectedKey => alert(`selected ${selectedKey}`)}
>
  <Nav.Item>
    <Nav.Link href="/home">Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2">Link</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      Disabled
    </Nav.Link>
  </Nav.Item>
</Nav>

  <Jumbotron>
  <h1>Inventory</h1>
  <p>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </p>
 
  <div class="search-container">
    <form action="/Abl">
      <input type="text" placeholder="Search.." name="search" style= {{width: '50%'}} /> 
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>



</Jumbotron>

<Card bg="primary" text="white" style={{ width: '18rem', display: "inline-block" , padding: "30px", margin: "30px" }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Primary Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>


  <Card bg="primary" text="white" style={{ width: '18rem', display: "inline-block", padding: "30px", margin: "30px" }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Primary Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>



<Card style={{display: "inline-block", }}>
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

<Card>
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>



</div>





  );
};

export default Dashboard;
