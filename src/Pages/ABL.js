import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ItemsContext } from "../Contexts/ItemsContext";

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
            <th>Current Lot Number</th>
            <th>Expiration Date</th>
            <th>Quantity in Stock</th>
          </tr>
        </thead>
        <tbody>
          {ablItems.map(item => (
            <tr key={item.orderID}>
              <td>{item.name}</td>
              <td>{item.isCurrentLot ? item.lotNum : "---"}</td>
              <td>{item.expirationDate}</td>
              <td>{item.quantityInStock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default ABL;
