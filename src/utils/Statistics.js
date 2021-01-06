import moment from "moment";
/**
 *
 * @param {Object} aggregatedTransactions - object with timestamp/transactionAmount key/value pairs
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
  const upperLimit = moment().startOf("month")

  //  AGGREGATE TRANSACTIONS BASED ON MONTH IF QUANTITYINSTOCK < 1
  const aggregatedTransactions = transactionsArr
      .filter(transaction => moment(transaction.createdAt).isBefore(upperLimit))
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

export const turnover = (transactionsArr, precision) => {
  const upperLimit = moment().startOf("month")

  const aggregatedTransactions = transactionsArr
    .filter(transaction => moment(transaction.createdAt).isBefore(upperLimit))
    .reduce((acc, curr) => {
      const property = moment(curr.createdAt).startOf("month")

      if (acc[property]) {
        acc[property].push(curr);
      } else {
        acc[property] = [curr];
      }
      return acc;
    }, {});

  Object.values(aggregatedTransactions).forEach(month => {
    month.sort((a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? -1 : 1));
  });

  const monthlyTurnover = Object.entries(aggregatedTransactions).reduce(
    (acc, curr) => {
      const property = curr[0];
      const arr = curr[1];
      const avgInventory =
        (arr[0].quantityInStock + arr[arr.length - 1].quantityInStock) / 2;
      const usage = arr.reduce((accum, current) => {
        if (current.transactionType === "used") {
          accum += current.amount;
        }
        return accum;
      }, 0);
      const turnover = (usage / avgInventory).toFixed(precision);
      acc[property] = turnover;
      return acc;
    },
    {}
  );

  return monthlyTurnover;
};
