import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";


import { sortTable } from "./TableUtils";

import NavbarComponent from "../../components/navbar/navbar.component";
import Tables_main from "../../Table/Tables_main";
import Tables2 from "../../Table/Tables2";





const Cobas8100Component = ()=> {

    const [ablItems, setAblItems] = useState();
    const [currentLotItems, setCurrentLotItems] = useState();
    const [isNameSorted, setIsNameSorted] = useState(false);
    const [isLotNumSorted, setIsLotNumSorted] = useState(false);
    const [isExpDateSorted, setIsExpDateSorted] = useState(false);
    const [isQuantitySorted, setIsQauntitySorted] = useState(false);
    const history = useHistory();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
        //const res = await fetch("/api/ABL/all-items");
     //const res = await fetch("/api/Architect/all-items");
      const res = await fetch("/api/8100");
  
          const data = await res.json();
          console.log(data)
          const findCurrentLotItems = data.filter((item) => item.isCurrentLot);
          setAblItems(data);
          setCurrentLotItems(findCurrentLotItems);
        } catch (err) {
          throw new Error("Unable to fetch AblComponent items");
        }
      };
      fetchData();
    }, []);
  
    const handleTableHeaderClick = (e) => {
      const clickedHeader = e.target.innerText.trim();
      // u can click on the headers, but not the arrows...
      console.log(clickedHeader)
      let currentLotSortedItems = [...currentLotItems];
      switch (clickedHeader) {
        case "Name":
          currentLotSortedItems = sortTable(
            currentLotSortedItems,
            "displayName",
            isNameSorted,
            setIsNameSorted
          );
          setCurrentLotItems(currentLotSortedItems);
          break;
        case "Current Lot":
          currentLotSortedItems = sortTable(
            currentLotSortedItems,
            "lotNum",
            isLotNumSorted,
            setIsLotNumSorted
          );
          setCurrentLotItems(currentLotSortedItems);
          break;
        case "Expiration Date":
          currentLotSortedItems = sortTable(
            currentLotSortedItems,
            "expirationDate",
            isExpDateSorted,
            setIsExpDateSorted
          );
          setCurrentLotItems(currentLotSortedItems);
          break;
        case "Quantity":
          currentLotSortedItems = sortTable(
            currentLotSortedItems,
            "quantity",
            isQuantitySorted,
            setIsQauntitySorted
          );
          setCurrentLotItems(currentLotSortedItems);
          break;
        default:
          break;
      }
    };
  
    /**
      Handle click events for each table row.
      Get matching item from ablItems.
      Route to ItemDetails component (query string containing lotNum), and pass array of
      current lot and new lot items.
     */
    const handleClick = (e) => {
      const clickedDisplayName = e.currentTarget.querySelector("td").innerText;
      const clickedItem = ablItems.filter(
        (item) => item.displayName === clickedDisplayName
      );
      history.push({
        pathname: `/ABL/${clickedItem[0].reagentName}`,
        search: `lotNum=${clickedItem[0].lotNum}`,
        state: {
          param: clickedItem[0].reagentName,
          items: clickedItem,
        },
      });
    };






return (

<div>


{/* <Tables_main /> */}

{ablItems ? (
        <>
          <NavbarComponent />
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
                  ? currentLotItems.map((item) => {
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
          <NavbarComponent />
          <section></section>
        </>
      )}













 <Tables2 /> 
      

</div>



)
} 

export default Cobas8100Component;
