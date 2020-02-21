import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import moment from "moment";
import Chart from "chart.js";

let chart; //  declare chart as global to allow chart.destroy() to work properly

const ItemChart = props => {
  // STATE AND CLICK HANDLER FUNCTIONS
  const [show, setShow] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  HELPER FUNCTIONS FOR CHART BUILDING
  /**
   * Retrieves transactions for an item given a transaction type.
   * @param {Object[]} transactionsArr - array of all transaction objects for an item.
   * @param {string} transactionType - correlates to type property on transaction objects.
   * @param {boolean} getAllData - if false, each transaction object contains only "timestamp"
   * and "amount" properties. If true, each trransaction object has all original properties.
   * @return {Object[]} array of transaction objects. Each object has 'timestamp' and
   * 'amount' properties. These correspond to 'x' and 'y' values for chart building.
   * This format is necessary for working with Chart.js.
   */
  const getRawData = (transactionsArr, transactionType, getAllData = false) => {
    switch (transactionType) {
      case "usage":
        if (!getAllData) {
          return transactionsArr
            .filter(item => item.type === "used")
            .reduce((acc, curr) => {
              acc.push({
                timestamp: curr.timestamp,
                amount: curr.amount
              });
              return acc;
            }, []);
        } else {
          return transactionsArr.filter(item => item.type === "used");
        }
      case "received":
        if (!getAllData) {
          return transactionsArr
            .filter(item => item.type === "received")
            .reduce((acc, curr) => {
              acc.push({
                timestamp: curr.timestamp,
                amount: curr.amount
              });
              return acc;
            }, []);
        } else {
          return transactionsArr.filter(item => item.type === "received");
        }
      case "inStock":
        if (!getAllData) {
          return transactionsArr.reduce((acc, curr) => {
            acc.push({
              timestamp: curr.timestamp,
              amount: curr.quantityInStock
            });
            return acc;
          }, []);
        } else {
          return transactionsArr;
        }
      default:
        return;
    }
  };

  /**
   * Filters transaction objects based on their timestamp value.
   * @param {number} numOfDays - number of days to go back to filter transactions.
   * @param {Object[]} arr - array of transaction objects.
   * @return {Object[]} array of transaction objects whose timestamp values are more recent
   * than numOfDays ago.
   */
  const filterByNumberOfDays = (numOfDays, arr) => {
    return arr.filter(
      transaction =>
        transaction.timestamp >= moment().subtract({ days: numOfDays })
    );
  };
  /**
   * Bins data into common dates.
   * Chart.js cannot easily plot data that share x-axis labels, so aggregating data
   * with common x-axis labels is required for proper rendering.
   * @param {number} numOfDays - number of days to go back to filter transactions.
   * @param {Object[]} data - array of transaction objects.
   * @return {Object[]} array of transaction objects.
   */
  const aggregateData = (numOfDays, data) => {
    let timeFrame = "";
    switch (numOfDays) {
      case 1:
        timeFrame = "hour";
        break;
      case 30:
        timeFrame = "day";
        break;
      case 365:
        timeFrame = "month";
        break;
      default:
        timeFrame = "day";
    }
    return filterByNumberOfDays(numOfDays, data).reduce((acc, curr) => {
      const property = moment(curr.timestamp)
        .startOf(timeFrame)
        .format();
      if (acc.hasOwnProperty(property)) {
        acc[property] += curr.amount;
      } else {
        acc[property] = curr.amount;
      }
      return acc;
    }, {});
  };

  /**
   * To be used when preparing data for "inStock" charts.
   * This function will find the last transaction made on a given date. That final
   * transaction's "quantityInStock" property is used as quantity in stock for that date.
   * @param {number} numOfDays - number of days to go back to filter transactions.
   * @param {Object[]} data - array of transaction objects.
   * @param return {Object[]} array of transaction objects. Each property is a date corresponding
   * to when transactions were made. The value is an object with "amount" and "timestamp" properties.
   * The "timestamp" property is used to determine the final transaction on the given date.
   * The "amount" property is what will be used as the y-coordinate in chart.js.
   */
  const aggregateQuantityData = (numOfDays, data) => {
    let dateFormat = "";
    let timeFrame = "";
    switch (numOfDays) {
      case 1:
        timeFrame = "hour";
        break;
      case 365:
        dateFormat = "YYYY-MM";
        timeFrame = "month";
        break;
      default:
        dateFormat = "YYYY-MM-DD";
        timeFrame = "day";
    }
    const quantityRawData = filterByNumberOfDays(numOfDays, data).reduce(
      (acc, curr) => {
        const property = moment(curr.timestamp)
          .startOf(timeFrame)
          .format();
        if (
          acc.hasOwnProperty(property) &&
          acc[property].timestamp < curr.timestamp
        ) {
          acc[property].amount = curr.amount;
        } else if (!acc.hasOwnProperty(property)) {
          acc[property] = {
            amount: curr.amount,
            timestamp: curr.timestamp
          };
        }
        return acc;
      },
      {}
    );
    return Object.entries(quantityRawData).reduce((acc, curr) => {
      const property = moment(curr[1].timestamp)
        .startOf(timeFrame)
        .format();
      acc[property] = curr[1].amount;
      return acc;
    }, {});
  };

  /**
   * Creates x-axis labels for all dates from now to numOfDays ago.
   * This is to force Chart.js to render all dates in a given range instead of
   * only showing dates that have an associated data point.
   * @param {number} numOfDays - number of days to go back to filter transactions.
   * @return {Object[]} array of dates in "MM-DD-YYYY" format.
   */
  const createTickLabels = numOfDays => {
    let timeFrame = "";
    let binSize = "";
    let emptyArr;

    switch (numOfDays) {
      case 1:
        timeFrame = "hour";
        binSize = "hours";
        emptyArr = new Array(24).fill(0);
        break;
      case 30:
        binSize = "days";
        timeFrame = "day";
        emptyArr = new Array(30).fill(0);
        break;
      case 365:
        binSize = "months";
        timeFrame = "month";
        emptyArr = new Array(12).fill(0);
        break;
      default:
        binSize = "days";
        timeFrame = "day";
        emptyArr = new Array(7).fill(0);
    }
    return emptyArr.map((tick, index) => {
      return moment()
        .subtract({ [binSize]: index })
        .startOf(timeFrame)
        .format();
    });
  };

  /**
   * Get all data in appropriate format to work with Chart.js and
   * all the required x-axis labels.
   * @param {Object[]} transactionsArr - array of all transaction objects for an item.
   * @param {string} transactionType - correlates to type property on transaction objects.
   * @param {number} numOfDays - number of days to go back to filter transactions.
   * @return {Object} Object with two properties: data and labels. These arrays are used by Chart.js.
   */
  const getData = (transactionsArr, transactionType, numOfDays) => {
    const usageData = getRawData(transactionsArr, transactionType);
    const aggregatedUsageData =
      transactionType === "usage" || transactionType === "received"
        ? aggregateData(numOfDays, usageData)
        : aggregateQuantityData(numOfDays, usageData);

    const tickLabels = createTickLabels(numOfDays);
    const aggregatedUsageDataLabels = Object.keys(aggregatedUsageData);

    return tickLabels.reduce(
      (acc, curr) => {
        if (aggregatedUsageDataLabels.includes(curr)) {
          acc.labels.push(curr);
          acc.data.push(aggregatedUsageData[curr]);
        } else {
          acc.labels.push(curr);
          acc.data.push(0);
        }
        return acc;
      },
      { labels: [], data: [] }
    );
  };

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
            setShow(true);
          }
        }
      }
    });
  };

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
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map(transaction => (
                    <tr key={transaction.timestamp}>
                      <td>
                        {moment(transaction.timestamp).format(
                          "YYYY-MM-DD, h:mm A"
                        )}
                      </td>
                      <td>{transaction.type}</td>
                      <td>{transaction.amount}</td>
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
