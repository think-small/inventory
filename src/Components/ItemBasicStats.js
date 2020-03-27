import React from "react";
import { ListGroup } from "react-bootstrap";
import moment from "moment";
import StatisticTooltip from "./StatisticTooltip";
import { aggregateData, getRawData } from "../UtilityFunctions/DataCleaning";
import {
  calcAverage,
  stockOut,
  turnover
} from "../UtilityFunctions/Statistics";

const ItemBasicStats = ({ itemToDisplay: { transactions, countPerBox } }) => {
  //  ACQUIRE DATA
  const usageData = getRawData(transactions, "usage");
  const receivedData = getRawData(transactions, "received");

  const aggregatedUsageData = aggregateData(365, usageData);
  const aggregatedReceivedData = aggregateData(365, receivedData);

  //  PERFORM STATISTICAL CALCULATIONS
  //  Note: monthly averages are based on aggregated 13 months of data NOT 12 months
  //  @todo figure out how to change filterByNumberOfDays to accurately grab 12 months of data
  const monthlyUsage = calcAverage(aggregatedUsageData, 2);
  const monthlyReceived = calcAverage(aggregatedReceivedData, 2);
  const stockOutStat = stockOut(transactions, 2);
  const turnoverStat = turnover(transactions, 2);
  const avgTurnover = (
    Object.values(turnoverStat).reduce((acc, curr) => acc + Number(curr), 0) /
    Object.values(turnoverStat).length
  ).toFixed(2);

  return (
    <ListGroup>
      <ListGroup.Item className="list-header">Statistics</ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Monthly Usage</span>
        <span className="stat-value">{monthlyUsage}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Monthly Units Received</span>
        <span className="stat-value">{monthlyReceived * countPerBox}</span>
      </ListGroup.Item>
      <StatisticTooltip
        title="Stock Out"
        content="The average number of times inventory ran out in a given time period"
        direction="right"
      >
        <ListGroup.Item className="list-row">
          <span>Monthly Stock Out</span>
          <span className="stat-value">{stockOutStat}</span>
        </ListGroup.Item>
      </StatisticTooltip>
      <StatisticTooltip
        title="Turnover"
        content="A ratio indicating how many times the entire inventory for this item has been used and replaced every month"
        direction="right"
      >
        <ListGroup.Item className="list-row">
          <span>Monthly Turnover</span>
          <span className="stat-value">{avgTurnover}</span>
        </ListGroup.Item>
      </StatisticTooltip>
    </ListGroup>
  );
};

export default ItemBasicStats;
