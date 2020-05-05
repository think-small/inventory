
import React from "react";
import moment from "moment";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container"; 





function Jumbotron1 (props) {

    const current_time = moment().format("LT");
    const current_date = moment().format("L");


return (

    <Jumbotron   style={{ fontFamily: "Helvetica Neue", fontSize: "20px" }}>
    <Container>
      <h1>{props.Title}</h1>
        <div>
            <i>
              Current Local Time: {current_date} {current_time}
            </i>{" "}
          </div>
    </Container>
  </Jumbotron>


)
}


export default Jumbotron1; 