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
      <ListGroup.Item>{`Lot Number: ${lotNum}`}</ListGroup.Item>
      <ListGroup.Item>{`Expiration Date: ${formattedExpirationDate}`}</ListGroup.Item>
      <ListGroup.Item>{`Quantity in Stock: ${quantity}`}</ListGroup.Item>
      <ListGroup.Item>{`Last Used: ${formattedLastUsedDate}`}</ListGroup.Item>
    </ListGroup>
  );
};

export default ItemSummaryInfo;
