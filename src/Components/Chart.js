import React, { useEffect } from "react";
import moment from "moment";
import Chart from "chart.js";

const ItemChart = props => {
  //  HELPER FUNCTIONS FOR CHART BUILDING
  const getRawData = (transactionsArr, transactionType) => {
    return transactionsArr
      .filter(item => item.type === transactionType)
      .reduce((acc, curr) => {
        acc.push({
          timestamp: curr.timestamp,
          amount: curr.amount
        });
        return acc;
      }, []);
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
  const buildUsageChart = (transactionsArr, displayName, numOfDays = 7) => {
    const data = getData(transactionsArr, "used", numOfDays);
    const canvas = document.getElementById("itemChart");
    canvas.width = 600;
    canvas.height = 270;

    const layoutSettings = {
      barColors: data.data.map(_ => "#3d547d"),
      hoverBarColors: data.data.map(_ => "#d6c120"),
      padding: 20
    };

    const chart = new Chart(canvas, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Amount Used",
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
          text: `${displayName} Usage Data`
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
                labelString: "Amount Used"
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
      props.currentLotItem.displayName
    );
  }, []);

  return (
    <>
      <canvas id="itemChart"></canvas>
    </>
  );
};

export default ItemChart;
