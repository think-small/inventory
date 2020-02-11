import React, { useEffect } from "react";
import { Card, Nav, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Chart from "chart.js";

const ItemDetails = props => {
  //  Get all data for specific analyzer
  //  Separate items into current lot and new lot items - store each in separate arrays
  const { items } = props;
  const item = items[props.match.params.id];
  const currentLotItem = item.filter(
    item => item.isCurrentLot === true && item.isNewLot === false
  )[0];
  const newLotItem = item.filter(
    item => item.isCurrentLot === false && item.isNewLot === true
  )[0];

  //  Find most recent transaction for a given item
  const dateFormat = "MM/DD/YY";
  const dateTimeFormat = "MM/DD/YY - h:mm a";
  const now = moment().valueOf();
  const lastTransaction = moment(
    currentLotItem.transactions.reduce((acc, curr) => {
      if (acc.timestamp === undefined) {
        acc.timestamp = moment()
          .unix()
          .valueOf();
      }
      acc.timestamp =
        now - curr.timestamp < now - acc.timestamp
          ? curr.timestamp
          : acc.timestamp;
      return acc;
    }, {}).timestamp
  ).format(dateTimeFormat);

  //  Helper functions for chart building
  const getItemUsageData = transactionsArr => {
    return transactionsArr.reduce((acc, curr) => {
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

  //  Usage chart building
  const buildUsageChart = () => {
    const usageData = getItemUsageData(
      currentLotItem.transactions.filter(item => item.type === "used")
    );
    const aggregatedUsageData = filterByNumberOfDays(7, usageData).reduce(
      (acc, curr) => {
        const property = moment(curr.timestamp).format("MM-DD-YYYY");
        if (acc.hasOwnProperty(property)) {
          acc[property] += curr.amount;
        } else {
          acc[property] = curr.amount;
        }
        return acc;
      },
      {}
    );
    const data = Object.entries(aggregatedUsageData).reduce(
      (acc, curr) => {
        acc.labels.push(curr[0]);
        acc.data.push(curr[1]);
        return acc;
      },
      { labels: [], data: [] }
    );

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
          text: `${currentLotItem.displayName} Usage Data`
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
    buildUsageChart();
  }, []);

  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#currentLot">
            <Nav.Item>
              <Nav.Link href="#currentLot">Current Lot</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled={newLotItem ? false : true} href="#newLot">
                New Lot
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>{currentLotItem.displayName}</Card.Title>
          <ListGroup>
            <ListGroup.Item>{`Lot Number: ${currentLotItem.lotNum}`}</ListGroup.Item>
            <ListGroup.Item>{`Expiration Date: ${moment(
              currentLotItem.expirationDate
            ).format(dateFormat)}`}</ListGroup.Item>
            <ListGroup.Item>{`Quantity in Stock: ${currentLotItem.quantity}`}</ListGroup.Item>
            <ListGroup.Item>{`Last Used: ${lastTransaction}`}</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card id="canvas-container">
        <canvas id="itemChart"></canvas>
      </Card>
    </section>
  );
};

export default withRouter(ItemDetails);
