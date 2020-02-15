import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ArchitectContext } from "../Contexts/ArchitectContext";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

const Architect = () => {
  const { architectItems } = useContext(ArchitectContext);

  //  Get an array of only current lot items.
  //  entry[1] in the map function gives an array of objects, so it is necessary to return entry[1][0]
  //  to only get the object back.
  const currentLotItems = Object.entries(architectItems).map(entry => {
    if (entry[1].length > 1) {
      return {
        ...entry[1].filter(item => item.isCurrentLot)[0],
        name: entry[0]
      };
    } else {
      return { ...entry[1][0], name: entry[0] };
    }
  });
  return (
    <div>
    <Navbar />
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
          {currentLotItems.map(item => (
            <LinkContainer
              to={`/Architect/${item.name}`}
              key={item.orderID}
              style={{ curosr: "pointer" }}
            >
              <tr>
                <td>{item.displayName}</td>
                <td>{item.lotNum}</td>
                <td>
                  {item.expirationDate
                    ? moment(item.expirationDate).format("MM/DD/YY")
                    : "---"}
                </td>
                <td>{item.quantity}</td>
              </tr>
            </LinkContainer>
          ))}
        </tbody>
      </Table>
    </section>
    </div>
  );
};

export default Architect;
