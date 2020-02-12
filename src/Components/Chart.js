import React, { useEffect, useState } from "react";
import moment from "moment";
import Chart from "chart.js";

let chart; //  declare chart as global to allow chart.destroy() to work properly
const ItemChart = props => {
  //  HELPER FUNCTIONS FOR CHART BUILDING
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

  const filterByNumberOfDays = (numOfDays, arr) => {
    return arr.filter(
      transaction =>
        transaction.timestamp >= moment().subtract({ days: numOfDays })
    );
  };

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

  const createTickLabels = numOfDays => {
    const emptyArr = new Array(numOfDays).fill(0);
    return emptyArr.map((tick, index) => {
      return moment()
        .subtract({ days: index })
        .format("MM-DD-YYYY");
    });
  };

  const getData = (transactionsArr, transactionType, numOfDays) => {
    const usageData = getRawData(transactionsArr, transactionType);
    const aggregatedUsageData = aggregateData(numOfDays, usageData);

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
    console.log(numOfDays);
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

    if (chart) chart.destroy(); //  Needed to prevent persistence of previous data
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
        responsive: false,
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
