import React from "react";
import { ListGroup } from "react-bootstrap";
import { aggregateData, getRawData } from "../UtilityFunctions/DataCleaning";

const ItemBasicStats = ({ currentLotItem: { transactions } }) => {
  //  HELPER FUNCTIONS FOR STATISTICS
  const calcAverage = aggregatedTransactions => {
    const transactions = Object.values(aggregatedTransactions);
    const totalTransactions = transactions.length;
    const sum = transactions.reduce((acc, curr) => {
      return (acc += curr);
    }, 0);
    return sum / totalTransactions;
  };

  //  ACQUIRE DATA
  const usageData = getRawData(transactions, "usage");
  const receivedData = getRawData(transactions, "received");

  const aggregatedUsageData = aggregateData(365, usageData);
  const aggregatedReceivedData = aggregateData(365, receivedData);

  //  PERFORM STATISTICAL CALCULATIONS
  //  Note: monthly averages are based on aggregated 13 months of data NOT 12 months
  //  @todo figure out how to change filterByNumberOfDays to accurately grab 12 months of data
  const monthlyUsage = calcAverage(aggregatedUsageData);
  const monthlyReceived = calcAverage(aggregatedReceivedData);

  console.log(aggregatedReceivedData);
  return (
    <ListGroup>
      <ListGroup.Item>
        Average Monthly Usage: {monthlyUsage.toFixed(2)}
      </ListGroup.Item>
      <ListGroup.Item>
        Average Monthly Units Received: {monthlyReceived.toFixed(2)}
      </ListGroup.Item>
      <ListGroup.Item>Current Warnings || Warnings History</ListGroup.Item>
    </ListGroup>
  );
};

export default ItemBasicStats;
