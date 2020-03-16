import moment from "moment";
/**
 *
 * @param {Object[]} aggregatedTransactions - array of transaction objects
 * @param {number} precision - number of decimal places to report for the average
 * @return {number} average as a float with given precision
 */
export const calcAverage = (aggregatedTransactions, precision) => {
  const transactions = Object.values(aggregatedTransactions);
  const totalTransactions = transactions.length;
  const sum = transactions.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);
  return (sum / totalTransactions).toFixed(precision);
};

/**
 * Calculate average number of times inventory was < 1 every month
 * @todo customize time range for calculation (ie stock out per week, stock out per year, etc)
 * @param {Object[]} transactionsArr - Array of transaction objects
 * @param {number} precision - precision to report final result
 * @return {number} 'Stock Out' metric
 */
export const stockOut = (transactionsArr, precision) => {
  //  ONLY CONSIDER TRANSACTIONS FROM PREVIOUS MONTH
  //  TO AVOID A PARTIAL MONTH'S WORTH OF TRANSACTIONS
  const upperLimit = moment()
    .startOf("month")
    .valueOf();

  //  AGGREGATE TRANSACTIONS BASED ON MONTH IF QUANTITYINSTOCK < 1
  const aggregatedTransactions = transactionsArr
    .filter(transaction => transaction.timestamp < upperLimit)
    .reduce((acc, curr) => {
      const property = moment(curr.timestamp)
        .startOf("month")
        .valueOf();
      if (acc[property] && curr.quantityInStock < 1) {
        acc[property] += 1;
      } else if (!acc[property] && curr.quantityInStock < 1) {
        acc[property] = 1;
      } else if (!acc[property] && curr.quantityInStock >= 1) {
        acc[property] = 0;
      }
      return acc;
    }, {});

  //  PERFORM STOCK OUT CALCULATION
  const sum = Object.values(aggregatedTransactions).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
  const numOfMonths = Object.keys(aggregatedTransactions).length;
  return (sum / numOfMonths).toFixed(precision);
};
