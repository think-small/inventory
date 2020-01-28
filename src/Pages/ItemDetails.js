import React from "react";
import { Card, Nav, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import moment from "moment";

const ItemDetails = props => {
  const { items } = props;
  const item = items[props.match.params.id];
  const currentLotItem = item.filter(
    item => item.isCurrentLot === true && item.isNewLot === false
  )[0];
  const newLotItem = item.filter(
    item => item.isCurrentLot === false && item.isNewLot === true
  )[0];
  const dateFormat = "MM/DD/YY";
  const dateTimeFormat = "MM/DD/YY - h:mm a";
  const now = moment().valueOf();
  const lastTransaction = moment(
    currentLotItem.transactions.reduce((acc, curr) => {
      if (acc.timestamp === undefined) {
        acc.timestamp = moment()
          .unix()
          .valueOf();
      }
      acc.timestamp =
        now - curr.timestamp < now - acc.timestamp
          ? curr.timestamp
          : acc.timestamp;
      return acc;
    }, {}).timestamp
  ).format(dateTimeFormat);

  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#currentLot">
            <Nav.Item>
              <Nav.Link href="#currentLot">Current Lot</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled={newLotItem ? false : true} href="#newLot">
                New Lot
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>{currentLotItem.displayName}</Card.Title>
          <ListGroup>
            <ListGroup.Item>{`Lot Number: ${currentLotItem.lotNum}`}</ListGroup.Item>
            <ListGroup.Item>{`Expiration Date: ${moment(
              currentLotItem.expirationDate
            ).format(dateFormat)}`}</ListGroup.Item>
            <ListGroup.Item>{`Quantity in Stock: ${currentLotItem.quantity}`}</ListGroup.Item>
            <ListGroup.Item>{`Last Used: ${lastTransaction}`}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </section>
  );
};

export default withRouter(ItemDetails);
