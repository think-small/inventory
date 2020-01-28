import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import "./styles.css";

const Dashboard = () => {
  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "purple", padding: "20px" }}
      >
        <a
          className="my-lg-0 border border-dark"
          href="#"
          style={{ padding: "8px", align: "right", color: "white" }}
          onClick={() => alert("nothing yet!")}
        >
          Sign In
        </a>
      </nav>

      <Jumbotron className="jumbotron">
        <div className="alignment">
          <h1 style={{ fontSize: "50px" }}>
            <b>Inventory App</b>
          </h1>
          <p className="lead">
            An app to help us keep track of Inventory in the lab!
          </p>

          <div className="searchMenu">
            <div className="fas">
              <i
                className="fas fa-search"
                style={{ position: "absolute", marginBottom: "30px" }}
                onClick={() => alert("hello")}
              ></i>
            </div>
            <input
              className="searchBar"
              type="text"
              placeholder="Search for Items"
            />
          </div>
        </div>
      </Jumbotron>

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
