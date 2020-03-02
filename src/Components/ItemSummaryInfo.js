import React from "react";
import moment from "moment";
import { ListGroup } from "react-bootstrap";

const ItemSummaryInfo = ({
  currentLotItem: { lotNum, expirationDate, quantity, lastUsed }
}) => {
  const dateFormat = "YYYY-MM-DD";
  const dateTimeFormat = "YYYY-MM-DD, h:mm A";
  const formattedExpirationDate = moment(expirationDate).format(dateFormat);
  const formattedLastUsedDate = moment(lastUsed).format(dateTimeFormat);

  return (
    <ListGroup>
      <ListGroup.Item className="list-header">Item Details</ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Lot Number</span>
        <span>{lotNum}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Expiration Date</span>
        <span>{formattedExpirationDate}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Quantity In Stock</span>
        <span>{quantity}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Last Used</span>
        <span>{formattedLastUsedDate}</span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ItemSummaryInfo;
