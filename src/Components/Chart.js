import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import moment from "moment";
import { CSVLink } from "react-csv";
import uuid from "uuid";
import Chart from "chart.js";
import { getRawData, getData } from "../UtilityFunctions/DataCleaning";

let chart; //  declare chart as global to allow chart.destroy() to work properly

const ItemChart = props => {
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
    const data = getData(transactionsArr, type, numOfDays, countPerBox);
    const canvas = document.getElementById("itemChart");
    canvas.width = 600;
    canvas.height = 270;

    const layoutSettings = {
      barColors: data.data.map(val => (val >= 0 ? "#24292e" : "#991a11")),
      hoverBarColors: data.data.map(val => (val >= 0 ? "#4b555e" : "#d12115")),
      padding: 20
    };
    if (type === "usage") {
      layoutSettings.titleText = "Usage Data";
      layoutSettings.yLabel = "Amount Used";
    } else if (type === "inStock") {
      layoutSettings.titleText = "In Stock Data";
      layoutSettings.yLabel = "Amount in Stock";
    } else if (type === "received") {
      layoutSettings.titleText = "Received Data";
      layoutSettings.yLabel = "Amount Received";
    }

    const chartSettings = {};
    switch (numOfDays) {
      case 1:
        chartSettings.unit = "hour";
        chartSettings.format = "hh a";
        break;
      case 30:
        chartSettings.unit = "day";
        chartSettings.format = "MMM D";
        break;
      case 365:
        chartSettings.unit = "month";
        chartSettings.format = "MMM YYYY";
        break;
      default:
        chartSettings.unit = "day";
        chartSettings.format = "MMM D";
    }

    //  Needed to prevent persistence of previous data;
    //  consier chart.update() if destroy() is slow.
    if (chart) chart.destroy();
    chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: layoutSettings.yLabel,
            data: data.data,
            backgroundColor: layoutSettings.barColors,
            borderColor: layoutSettings.barColors,
            hoverBackgroundColor: layoutSettings.hoverBarColors
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: layoutSettings.padding
        },
        title: {
          display: true,
          text: `${displayName} ${layoutSettings.titleText}`
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series",
              offset: true,
              gridLines: {
                display: false
              },
              time: {
                unit: chartSettings.unit,
                displayFormats: {
                  [chartSettings.unit]: chartSettings.format
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: layoutSettings.yLabel
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            title: tooltipItem => {
              switch (numOfDays) {
                case 365:
                  return `${tooltipItem[0]["label"]
                    .split("-")
                    .slice(0, 2)
                    .join("-")}`;
                default:
                  return `${tooltipItem[0]["label"].split("T")[0]}`;
              }
            }
          },
          custom: tooltip => (tooltip.displayColors = false)
        },
        onClick: (e, item) => {
          if (item[0] && item[0].hasOwnProperty("_model")) {
            const dateString = item[0]._model.label;
            const dateObj = new Date(dateString);
            const momentObj = moment(dateObj);

            const rawData = getRawData(
              props.itemToDisplay.transactions,
              props.chartType,
              true
            );
            const filteredByDateData = rawData
              .filter(transaction => {
                return (
                  moment(transaction.timestamp)
                    .startOf(chartSettings.unit)
                    .format() === momentObj.startOf(chartSettings.unit).format()
                );
              })
              .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
            setTransactionHistory([...filteredByDateData]);
            handleShow();
          }
        }
      }
    });
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
          rootMargin: "-145px 0px 0px 0px" //  -145px to avoid adding and removing isScrolling class when modal is opened.
        };
        const tableBodyObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting && tableHeaderRefs.current[0]) {
              //  null check for ref prevents firing when modal closes
              tableHeaderRefs.current.forEach(ref =>
                ref.classList.add("isScrolling")
              );
            } else if (entry.isIntersecting && tableHeaderRefs.current[0]) {
              //  null check for ref prevents firing when modal closes
              tableHeaderRefs.current.forEach(ref =>
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
                        ref={ref => (tableHeaderRefs.current[index] = ref)}
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
                      ref={ref => (tableRef.current[index] = ref)}
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
            data={transactionHistory.map(transaction => {
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
                key: "quantityInStock"
              },
              { label: "Timestamp", key: "timestamp" },
              { label: "Amount Used", key: "amount" },
              { label: "Number of Boxes Received", key: "numBoxesReceived" }
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
