import React, { useEffect } from "react";
import { Card, Nav, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import moment from "moment";
import * as d3 from "d3";

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

  //  Chart building with d3 for item usage histogram
  const getItemUsageData = transactionsArr => {
    return transactionsArr.reduce((acc, curr) => {
      acc.push({
        timestamp: curr.timestamp,
        amount: curr.amount
      });
      return acc;
    }, []);
  };
  const buildChart = () => {
    const width = 300;
    const height = 200;
    const data = getItemUsageData(currentLotItem.transactions);
    const chart = d3
      .select("svg")
      .attr("height", height)
      .attr("width", width + 5);

    const xExtent = d3.extent(data, d => d.timestamp);
    const yExtent = d3.extent(data, d => d.amount);
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([10, width - 10]);
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([height - 10, 10]);
    const cleanedData = data.map(dataPoint => {
      return {
        x: xScale(dataPoint.timestamp),
        y: yScale(dataPoint.amount),
        height: height - yScale(dataPoint.amount),
        fill: "black"
      };
    });
    console.log(cleanedData);
    cleanedData.forEach(dataPoint => {
      chart
        .append("rect")
        .attr("x", dataPoint.x)
        .attr("y", dataPoint.y)
        .attr("height", dataPoint.height)
        .attr("width", 5)
        .attr("fill", dataPoint.fill);
    });
  };

  useEffect(() => {
    buildChart();
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
      <svg style={{ border: "1px solid black", margin: "1rem 2rem" }}></svg>
    </section>
  );
};

export default withRouter(ItemDetails);
