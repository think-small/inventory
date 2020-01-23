import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ArchitectContext } from "../Contexts/ArchitectContext";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";

const Architect = () => {
  const { architectItems } = useContext(ArchitectContext);
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
          {Object.keys(architectItems).map(item => (
            <LinkContainer
              to={`/ArchitectL/${architectItems[item][0].itemID}`}
              key={architectItems[item][0].orderID}
              style={{ cursor: "pointer" }}
            >
              <tr>
                <td>{architectItems[item][0].displayName}</td>
                <td>{architectItems[item][0].lotNum}</td>
                <td>
                  {architectItems[item][0].expirationDate
                    ? moment(architectItems[item][0].expirationDate).format(
                        "MM/DD/YY"
                      )
                    : "---"}
                </td>
                <td>{architectItems[item][0].quantity}</td>
              </tr>
            </LinkContainer>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default Architect;
