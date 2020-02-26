import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import moment from "moment";
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
  const tableRef = useRef();
  /**
   * @todo Find way to create array of refs rather than individually creatings refs for all table headers
   */
  const tableHeader1 = useRef();
  const tableHeader2 = useRef();
  const tableHeader3 = useRef();

  //  CHART BUILDING FUNCTIONS
  const buildChart = (transactionsArr, displayName, type, numOfDays) => {
    const data = getData(transactionsArr, type, numOfDays);
    const canvas = document.getElementById("itemChart");
    canvas.width = 600;
    canvas.height = 270;

    const layoutSettings = {
      barColors: data.data.map(_ => "#3d547d"),
      hoverBarColors: data.data.map(_ => "#d6c120"),
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
              props.currentLotItem.transactions,
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
            if (!entry.isIntersecting && tableHeader1.current) {
              //  null check for ref prevents firing when modal closes
              tableHeader1.current.classList.add("isScrolling");
              tableHeader2.current.classList.add("isScrolling");
              tableHeader3.current.classList.add("isScrolling");
            } else if (entry.isIntersecting && tableHeader1.current) {
              //  null check for ref prevents firing when modal closes
              tableHeader1.current.classList.remove("isScrolling");
              tableHeader2.current.classList.remove("isScrolling");
              tableHeader3.current.classList.remove("isScrolling");
            }
          });
        }, tableBodyOptions);
        tableBodyObserver.observe(tableRef.current);
      }
    }
  }, [show]);

  useEffect(() => {
    buildChart(
      props.currentLotItem.transactions,
      props.currentLotItem.displayName,
      props.chartType,
      props.dateRange
    );
  }, [props.chartType, props.dateRange]);

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
                    <th className="chart-modal-th" ref={tableHeader1}>
                      Date
                    </th>
                    <th className="chart-modal-th" ref={tableHeader2}>
                      Type
                    </th>
                    <th className="chart-modal-th" ref={tableHeader3}>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction, index) => (
                    <tr
                      key={transaction.timestamp}
                      ref={index === 0 ? tableRef : null}
                    >
                      <td>
                        {moment(transaction.timestamp).format(
                          "YYYY-MM-DD, h:mm A"
                        )}
                      </td>
                      <td>{transaction.type}</td>
                      <td>
                        {transaction.type === "used"
                          ? transaction.amount
                          : transaction.numBoxesReceived *
                            props.currentLotItem.countPerBox}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ItemChart;
