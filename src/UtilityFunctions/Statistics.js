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
