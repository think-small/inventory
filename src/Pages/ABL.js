import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

const ABL = () => {
  const [ablItems, setAblItems] = useState();
  const [currentLotItems, setCurrentLotItems] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/ABL/all-items");
        const data = await res.json();
        const findCurrentLotItems = data.filter(item => item.isCurrentLot);
        setAblItems(data);
        setCurrentLotItems(findCurrentLotItems);
      } catch (err) {
        throw new Error("Unable to fetch ABL items");
      }
    };
    fetchData();
  }, []);

  /**
    Handle click events for each table row.
    Get matching item from ablItems.
    Route to ItemDetails component (query string containing lotNum), and pass array of
    current lot and new lot items.
   */
  const handleClick = e => {
    const clickedDisplayName = e.currentTarget.querySelector("td").innerText;
    const clickedItem = ablItems.filter(
      item => item.displayName === clickedDisplayName
    );
    history.push({
      pathname: `/ABL/${clickedItem[0].reagentName}`,
      search: `lotNum=${clickedItem[0].lotNum}`,
      state: {
        param: clickedItem[0].reagentName,
        items: clickedItem
      }
    });
  };

  return (
    <div>
      {ablItems ? (
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

export default ABL;
