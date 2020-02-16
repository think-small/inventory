import React, { useEffect, useState } from "react";
import moment from "moment";
import Chart from "chart.js";

let chart; //  declare chart as global to allow chart.destroy() to work properly

const ItemChart = props => {
  //  HELPER FUNCTIONS FOR CHART BUILDING
  /**
   * Retrieves transactions for an item given a transaction type.
   * @param {Object[]} transactionsArr - array of all transaction objects for an item.
   * @param {string} transactionType - correlates to type property on transaction objects.
   * @return {Object[]} array of transaction objects. Each object has 'timestamp' and
   * 'amount' properties. These correspond to 'x' and 'y' values for chart building.
   * This format is necessary for working with Chart.js.
   */
  const getRawData = (transactionsArr, transactionType) => {
    switch (transactionType) {
      case "usage":
        return transactionsArr
          .filter(item => item.type === "used")
          .reduce((acc, curr) => {
            acc.push({
              timestamp: curr.timestamp,
              amount: curr.amount
            });
            return acc;
          }, []);
      case "inStock":
        return transactionsArr.reduce((acc, curr) => {
          acc.push({ timestamp: curr.timestamp, amount: curr.quantityInStock });
          return acc;
        }, []);
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
   * @todo add functionality to change bin size (ie bins that stretch a week or month).
   * @param {number} numOfDays - number of days to go back to filter transactions.
   * @param {Object[]} data - array of transaction objects.
   * @return {Object[]} array of transaction objects.
   */
  const aggregateData = (numOfDays, data) => {
    return filterByNumberOfDays(numOfDays, data).reduce((acc, curr) => {
      const property = moment(curr.timestamp).format("MM-DD-YYYY");
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
    const quantityRawData = filterByNumberOfDays(numOfDays, data).reduce(
      (acc, curr) => {
        const property = moment(curr.timestamp).format("MM-DD-YYYY");
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
      const property = moment(curr[1].timestamp).format("MM-DD-YYYY");
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
    const emptyArr = new Array(numOfDays).fill(0);
    return emptyArr.map((tick, index) => {
      return moment()
        .subtract({ days: index })
        .format("MM-DD-YYYY");
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
      transactionType === "usage"
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
  //  USAGE CHART
  const buildUsageChart = (transactionsArr, displayName, type, numOfDays) => {
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
                unit: "day",
                displayFormats: {
                  day: "MMM D"
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
          custom: tooltip => (tooltip.displayColors = false)
        }
      }
    });
  };

  useEffect(() => {
    buildUsageChart(
      props.currentLotItem.transactions,
      props.currentLotItem.displayName,
      props.chartType,
      props.dateRange
    );
  }, [props.chartType, props.dateRange]);

  return (
    <>
      <canvas id="itemChart"></canvas>
    </>
  );
};

export default ItemChart;
