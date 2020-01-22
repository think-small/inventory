import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ItemsContext } from "../Contexts/ItemsContext";
import { LinkContainer } from "react-router-bootstrap";

const ABL = () => {
  const { items } = useContext(ItemsContext);
  const ablItems = items.filter(
    item => item.instrument === "ABL" && item.isCurrentLot
  );
  return (
    <section>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Lot</th>
            <th>Expiration Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ablItems.map(item => (
            <LinkContainer
              to={`/ABL/${item.itemID}`}
              key={item.orderID}
              style={{ cursor: "pointer" }}
            >
              <tr>
                <td>{item.name}</td>
                <td>{item.lotNum}</td>
                <td>{item.expirationDate}</td>
                <td>{item.quantityInStock}</td>
              </tr>
            </LinkContainer>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default ABL;
