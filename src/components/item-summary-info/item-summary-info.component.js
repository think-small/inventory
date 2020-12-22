import React from "react";
//  UTILITY FUNCTION IMPORTS
import moment from "moment";

//  COMPONENT IMPORTS
import { ListGroup } from "react-bootstrap";
import "./item-summary-info.styles.scss";

const ItemSummaryInfoComponent = ({
  itemToDisplay: { lotNum, expirationDate, quantity, transactions }
}) => {
  const dateFormat = "YYYY-MM-DD";
  const dateTimeFormat = "YYYY-MM-DD, h:mm A";
  const formattedExpirationDate = moment(expirationDate).format(dateFormat);
  const sortedTransactions = transactions.sort((a, b) =>
    a.timestamp < b.timestamp ? 1 : -1
  );
//  const lastUsed = sortedTransactions.find(
//    transaction => transaction.transactionType === "used"
//  );
//  const formattedLastUsedDate = moment(lastUsed.timestamp).format(
//    dateTimeFormat
//  );

  return (
    <ListGroup>
      <ListGroup.Item className="list-header">Item Details</ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Lot Number</span>
        <span className="summary-value">{lotNum}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Expiration Date</span>
        <span className="summary-value">{formattedExpirationDate}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Quantity In Stock</span>
        <span className="summary-value">{quantity}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Last Used</span>
      {/*  <span className="summary-value">{formattedLastUsedDate}</span> */ }
      <span className="summary-value"> Doesn't work for me unless I disable-Tony</span> 
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ItemSummaryInfoComponent;
