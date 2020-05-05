import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
//  UTILITY FUNCTION IMPORTS
import moment from "moment";
import uuid from "uuid";
import { setLayoutSettings, setChartSettings, createChart } from "./chart.utils";
import { getData } from "../../utils/DataCleaning";

//  COMPONENT IMPORTS
import { Modal, Button, Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import "./chart.styles.scss";

let chart; //  declare chart as global to allow chart.destroy() to work properly

const ItemChart = (props) => {
  // STATE AND CLICK HANDLER FUNCTIONS
  const [show, setShow] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const isInitialMount = useRef(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  ACCESSING DOM NODES
  const tableRef = useRef([]);
  const tableHeaderRefs = useRef([]);
  const tableHeaders = ["Date", "Type", "Amount"];

  //  CHART BUILDING FUNCTIONS
  const buildChart = (
    transactionsArr,
    displayName,
    type,
    numOfDays,
    countPerBox
  ) => {
    const WIDTH = 600;
    const HEIGHT = 270;

    const data = getData(transactionsArr, type, numOfDays, countPerBox);
    const canvas = document.getElementById("itemChart");

    //  CONFIGURE CHART SETTINGS
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    const layoutSettings = setLayoutSettings(type, data);
    const chartSettings = setChartSettings(numOfDays);

    //  Needed to prevent persistence of previous data;
    //  consider chart.update() if destroy() is slow.
    if (chart) chart.destroy();
    chart = createChart(
        chart, canvas, data,
        displayName, numOfDays, type, props.itemToDisplay,
        layoutSettings, chartSettings, setTransactionHistory, handleShow);
  };

  useLayoutEffect(() => {
    //  useLayoutEffect is utilized since there is direct DOM manipulation
    //  Note: useLayoutEffect should fire before useEffect
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (show) {
        const tableBodyOptions = {
          root: null,
          threshold: 0,
          rootMargin: "-145px 0px 0px 0px", //  -145px to avoid adding and removing isScrolling class when modal is opened.
        };
        const tableBodyObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && tableHeaderRefs.current[0]) {
              //  null check for ref prevents firing when modal closes
              tableHeaderRefs.current.forEach((ref) =>
                ref.classList.add("isScrolling")
              );
            } else if (entry.isIntersecting && tableHeaderRefs.current[0]) {
              //  null check for ref prevents firing when modal closes
              tableHeaderRefs.current.forEach((ref) =>
                ref.classList.remove("isScrolling")
              );
            }
          });
        }, tableBodyOptions);
        tableBodyObserver.observe(tableRef.current[0]);
      }
    }
  }, [show]);

  useEffect(() => {
    buildChart(
      props.itemToDisplay.transactions,
      props.itemToDisplay.displayName,
      props.chartType,
      props.dateRange,
      props.itemToDisplay.countPerBox
    );
  }, [props.chartType, props.dateRange, props.itemToDisplay]);

  return (
    <>
      <canvas id="itemChart"></canvas>
      <Modal
        scrollable
        id="transactions-modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionHistory && (
            <div className="table-fixed-header">
              <Table className="chart-modal-table">
                <thead>
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th
                        className="chart-modal-th"
                        key={index}
                        ref={(ref) => (tableHeaderRefs.current[index] = ref)}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction, index) => (
                    <tr
                      key={uuid()}
                      ref={(ref) => (tableRef.current[index] = ref)}
                    >
                      <td>
                        {moment(transaction.timestamp).format(
                          "YYYY-MM-DD, h:mm A"
                        )}
                      </td>
                      <td>{transaction.transactionType}</td>
                      <td>
                        {transaction.transactionType === "used"
                          ? transaction.amount
                          : transaction.numBoxesReceived *
                            props.itemToDisplay.countPerBox}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="transaction-history-modal-footer">
          <CSVLink
            className="transaction-download-button"
            data={transactionHistory.map((transaction) => {
              const transactionCopy = { ...transaction };
              transactionCopy.timestamp = moment(
                transactionCopy.timestamp
              ).format("YYYY-MM-DD h:mm A");
              return transactionCopy;
            })}
            headers={[
              { label: "Transaction Type", key: "transactionType" },
              {
                label: "Quantity in Stock After Transaction",
                key: "quantityInStock",
              },
              { label: "Timestamp", key: "timestamp" },
              { label: "Amount Used", key: "amount" },
              { label: "Number of Boxes Received", key: "numBoxesReceived" },
            ]}
            target="_blank"
            filename={`${props.itemToDisplay.displayName} Transactions.csv`}
          >
            Download
          </CSVLink>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemChart;
