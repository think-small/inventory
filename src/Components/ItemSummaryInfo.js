import React from "react";
import moment from "moment";
import { ListGroup } from "react-bootstrap";

const ItemSummaryInfo = ({
  itemToDisplay: { lotNum, expirationDate, quantity, transactions }
}) => {
  const dateFormat = "YYYY-MM-DD";
  const dateTimeFormat = "YYYY-MM-DD, h:mm A";
  const formattedExpirationDate = moment(expirationDate).format(dateFormat);
  const sortedTransactions = transactions.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  );
  const lastUsed = sortedTransactions.find(
    transaction => transaction.transactionType === "used"
  );
  const formattedLastUsedDate = moment(lastUsed.timestamp).format(
    dateTimeFormat
  );

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
