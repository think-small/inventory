import moment from "moment";
import { createTickLabels } from "./DataVisualization";

//  TABLE OF CONTENTS
//  1) ACQUISITION
//  2) FILTERING
//  3) AGGREGATION

//  1) ACQUISITION
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
export const getRawData = (
  transactionsArr,
  transactionType,
  getAllData = false
) => {
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
              amount: curr.numBoxesReceived
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
 * Get all data in appropriate format to work with Chart.js and
 * all the required x-axis labels.
 * @param {Object[]} transactionsArr - array of all transaction objects for an item.
 * @param {string} transactionType - correlates to type property on transaction objects.
 * @param {number} numOfDays - number of days to go back to filter transactions.
 * @return {Object} Object with two properties: data and labels. These arrays are used by Chart.js.
 */
export const getData = (transactionsArr, transactionType, numOfDays) => {
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

//  2) FILTERING
/**
 * Filters transaction objects based on their timestamp value.
 * @param {number} numOfDays - number of days to go back to filter transactions.
 * @param {Object[]} arr - array of transaction objects.
 * @return {Object[]} array of transaction objects whose timestamp values are more recent
 * than numOfDays ago.
 */
export const filterByNumberOfDays = (numOfDays, arr) => {
  return arr.filter(
    transaction =>
      transaction.timestamp >= moment().subtract({ days: numOfDays })
  );
};

export const filterByType = (transactions, transactionType) => {
  return transactions.filter(
    transaction => transaction.type === transactionType
  );
};

//  3) AGGREGATION
/**
 * Bins data into common dates.
 * Chart.js cannot easily plot data that share x-axis labels, so aggregating data
 * with common x-axis labels is required for proper rendering.
 * @param {number} numOfDays - number of days to go back to filter transactions.
 * @param {Object[]} data - array of transaction objects.
 * @return {Object[]} array of transaction objects.
 */
export const aggregateData = (numOfDays, data) => {
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
export const aggregateQuantityData = (numOfDays, data) => {
  let timeFrame = "";
  switch (numOfDays) {
    case 1:
      timeFrame = "hour";
      break;
    case 365:
      timeFrame = "month";
      break;
    default:
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
