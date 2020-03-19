import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

const Architect = () => {
  const [architectItems, setArchitectItems] = useState();
  const [currentLotItems, setCurrentLotItems] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const json = await fetch("/api/Architect/all-items");
      const data = await json.json();
      setArchitectItems(data);
      console.log(data);
      const currentLot = data.filter(item => item.isCurrentLot);
      setCurrentLotItems(currentLot);
    };
    fetchData();
  }, []);

  /**
    Handle click events for each table row.
    Get matching item from architectItems.
    Route to ItemDetails component (query string containing lotNum), and pass array of
    current lot and new lot items.
   */
  const handleClick = e => {
    const clickedDisplayName = e.currentTarget.querySelector("td").innerText;
    const clickedItem = architectItems.filter(
      item => item.displayName === clickedDisplayName
    );
    history.push({
      pathname: `/Architect/${clickedItem[0].reagentName}`,
      search: `lotNum=${clickedItem[0].lotNum}`,
      state: {
        param: clickedItem[0].reagentName,
        items: clickedItem
      }
    });
  };

  return (
    <div>
      {architectItems ? (
        <>
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
                {currentLotItems
                  ? currentLotItems.map(item => {
                      return (
                        <tr
                          key={item.orderID}
                          style={{ cursor: "pointer" }}
                          onClick={handleClick}
                        >
                          <td>{item.displayName}</td>
                          <td>{item.lotNum}</td>
                          <td>
                            {item.expirationDate
                              ? moment(item.expirationDate).format("MM/DD/YY")
                              : "---"}
                          </td>
                          <td>{item.quantity}</td>
                        </tr>
                      );
                    })
                  : "Loading..."}
              </tbody>
            </Table>
          </section>
        </>
      ) : (
        <>
          <Navbar />
          <section></section>
        </>
      )}
    </div>
  );
};

export default Architect;
