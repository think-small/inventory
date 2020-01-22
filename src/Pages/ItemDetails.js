import React, { useContext } from "react";
import { ItemsContext } from "../Contexts/ItemsContext";
import { Card, Nav, ListGroup } from "react-bootstrap";

const ItemDetails = props => {
  const { items } = useContext(ItemsContext);
  const currentLotItems = items.filter(
    item => item.itemID === props.match.params.id && item.isCurrentLot
  )[0];
  const newLotItems = items.filter(
    item =>
      item.itemID === props.match.params.id &&
      !item.isCurrentLot &&
      item.isNewLot
  );
  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#currentLot">
            <Nav.Item>
              <Nav.Link href="#currentLot">Current Lot</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                disabled={newLotItems.length ? false : true}
                href="#newLot"
              >
                New Lot
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>{currentLotItems.name}</Card.Title>
          <ListGroup>
            <ListGroup.Item>{`Lot Number: ${currentLotItems.lotNum}`}</ListGroup.Item>
            <ListGroup.Item>{`Expiration Date: ${currentLotItems.expirationDate}`}</ListGroup.Item>
            <ListGroup.Item>{`Quantity in Stock: ${currentLotItems.quantityInStock}`}</ListGroup.Item>
            <ListGroup.Item>{`Last Used: ${currentLotItems.lastScan}`}</ListGroup.Item>
            <ListGroup.Item>{`Order ID: ${currentLotItems.orderID}`}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </section>
  );
};

export default ItemDetails;
