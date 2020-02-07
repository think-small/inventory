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

  const filterByNumberOfDays = (numOfDays, arr) => {
    return arr.filter(
      transaction =>
        transaction.timestamp >= moment().subtract({ days: numOfDays })
    );
  };

  const buildUsageChart = () => {
    const margins = {
      left: 20,
      right: 20,
      top: 30,
      bottom: 5
    };
    const svgWidth = 400;
    const svgHeight = 200;
    const width = svgWidth - margins.left - margins.right;
    const height = svgHeight - margins.top - margins.bottom;
    const barWidth = 5;

    const usageData = getItemUsageData(
      currentLotItem.transactions.filter(item => item.type === "used")
    );
    const data = filterByNumberOfDays(7, usageData);
    data.forEach(transaction => console.log(moment(transaction.timestamp)));

    const chart = d3
      .select("svg")
      .attr("height", svgHeight)
      .attr("width", svgWidth);

    const xExtent = d3.extent(data, d => d.timestamp);
    const yExtent = d3.extent(data, d => d.amount);
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([height - margins.bottom, 0]);
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(d3.timeFormat("%b %d"))
      .ticks(d3.timeDay.every(7));
    const yAxis = d3.axisLeft(yScale);
    chart
      .append("g")
      .attr(
        "transform",
        `translate(${margins.left}, ${height - margins.bottom})`
      )
      .call(xAxis);
    chart
      .append("g")
      .attr("transform", `translate(${margins.right}, 0)`)
      .call(yAxis);
    chart
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.timestamp) + margins.left)
      .attr("y", d => yScale(d.amount) - margins.bottom)
      .attr("width", barWidth)
      .attr("height", d => height - yScale(d.amount));
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
      <svg style={{ margin: "1rem 2rem" }}></svg>
    </section>
  );
};

export default withRouter(ItemDetails);
