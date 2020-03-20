import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Navbar from "../Navbar/Navbar";

const Architect = () => {
  const [architectItems, setArchitectItems] = useState();
  const [currentLotItems, setCurrentLotItems] = useState();
  const [isNameSorted, setisNameSorted] = useState(false);
  const [isLotNumSorted, setisLotNumSorted] = useState(false);
  const [isExpDateSorted, setisExpDateSorted] = useState(false);
  const [isQuantitySorted, setisQuantitySorted] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Architect/all-items");
        const data = await res.json();
        const findCurrentLotItems = data.filter(item => item.isCurrentLot);
        setArchitectItems(data);
        setCurrentLotItems(findCurrentLotItems);
      } catch (err) {
        throw new Error("Unable to fetch Architect items");
      }
    };
    fetchData();
  }, []);

  const handleTableHeaderClick = e => {
    const clickedHeader = e.target.innerText.trim();
    const currentLotSortedItems = [...currentLotItems];
    switch (clickedHeader) {
      case "Name":
        if (!isNameSorted) {
          setisNameSorted(true);
          currentLotSortedItems.sort((a, b) =>
            a.displayName < b.displayName ? -1 : 1
          );
        } else {
          setisNameSorted(false);
          currentLotSortedItems.sort((a, b) =>
            a.displayName > b.displayName ? -1 : 1
          );
        }
        setCurrentLotItems(currentLotSortedItems);
        break;
      case "Current Lot":
        if (!isLotNumSorted) {
          setisLotNumSorted(true);
          currentLotSortedItems.sort((a, b) => (a.lotNum < b.lotNum ? -1 : 1));
        } else {
          setisLotNumSorted(false);
          currentLotSortedItems.sort((a, b) => (a.lotNum > b.lotNum ? -1 : 1));
        }
        setCurrentLotItems(currentLotSortedItems);
        break;
      case "Expiration Date":
        if (!isExpDateSorted) {
          setisExpDateSorted(true);
          currentLotSortedItems.sort((a, b) =>
            a.expirationDate < b.expirationDate ? -1 : 1
          );
        } else {
          setisExpDateSorted(false);
          currentLotSortedItems.sort((a, b) =>
            a.expirationDate > b.expirationDate ? -1 : 1
          );
        }
        setCurrentLotItems(currentLotSortedItems);
        break;
      case "Quantity":
        if (!isQuantitySorted) {
          setisQuantitySorted(true);
          currentLotSortedItems.sort((a, b) =>
            a.quantity < b.quantity ? -1 : 1
          );
        } else {
          setisQuantitySorted(false);
          currentLotSortedItems.sort((a, b) =>
            a.quantity > b.quantity ? -1 : 1
          );
        }
        setCurrentLotItems(currentLotSortedItems);
        break;
      default:
        break;
    }
  };

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
                  <th>
                    <span
                      className="sortable-table-header"
                      onClick={handleTableHeaderClick}
                    >
                      Name{" "}
                      <svg
                        className="bi bi-arrow-up-down"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </th>
                  <th>
                    <span
                      className="sortable-table-header"
                      onClick={handleTableHeaderClick}
                    >
                      Current Lot{" "}
                      <svg
                        className="bi bi-arrow-up-down"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </th>
                  <th>
                    <span
                      className="sortable-table-header"
                      onClick={handleTableHeaderClick}
                    >
                      Expiration Date{" "}
                      <svg
                        className="bi bi-arrow-up-down"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </th>
                  <th>
                    <span
                      className="sortable-table-header"
                      onClick={handleTableHeaderClick}
                    >
                      Quantity{" "}
                      <svg
                        className="bi bi-arrow-up-down"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </th>
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
