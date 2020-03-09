import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ArchitectContext } from "../Contexts/ArchitectContext";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

const Architect = () => {
  const { architectItems } = useContext(ArchitectContext);
  const history = useHistory();

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

  /**
    Handle click events for each table row.
    Get matching item from architectItems.
    Route to ItemDetails component (query string containing lotNum), and pass array of
    current lot and new lot items.
   */
  const handleClick = (e) => {
    const clickedDisplayName = e.currentTarget.querySelector("td").innerText;
    const clickedItem = Object.entries(architectItems).find(entry => {      
      return entry[1][0].displayName === clickedDisplayName
    })
    history.push({
      pathname: `/Architect/${clickedItem[0]}?lotNum=${clickedItem[1][0].lotNum}`,
      state: {
        items: clickedItem[1]
      }
    })
  }

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
          {currentLotItems.map(item => {
            console.log(architectItems[item.name]);
            return (
              <tr key={item.orderID} style={{ cursor: "pointer" }} onClick={handleClick}>
                <td>{item.displayName}</td>
                <td>{item.lotNum}</td>
                <td>
                  {item.expirationDate
                    ? moment(item.expirationDate).format("MM/DD/YY")
                    : "---"}
                </td>
                <td>{item.quantity}</td>
              </tr>
          )}
          )}
        </tbody>
      </Table>
    </section>
    </div>
  );
};

export default Architect;
