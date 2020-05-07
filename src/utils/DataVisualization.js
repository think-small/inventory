import moment from "moment";
/**
 * Creates x-axis labels for all dates from now to numOfDays ago.
 * This is to force Chart.js to render all dates in a given range instead of
 * only showing dates that have an associated data point.
 * @param {number} numOfDays - number of days to go back to filter transactions.
 * @return {Object[]} array of dates in "MM-DD-YYYY" format.
 */
export const createTickLabels = numOfDays => {
  let timeFrame = "";
  let binSize = "";
  let emptyArr;

  switch (numOfDays) {
    case 1:
      timeFrame = "hour";
      binSize = "hours";
      emptyArr = new Array(24).fill(0);
      break;
    case 30:
      binSize = "days";
      timeFrame = "day";
      emptyArr = new Array(30).fill(0);
      break;
    case 365:
      binSize = "months";
      timeFrame = "month";
      emptyArr = new Array(12).fill(0);
      break;
    default:
      binSize = "days";
      timeFrame = "day";
      emptyArr = new Array(7).fill(0);
  }
  return emptyArr.map((tick, index) => {
    return moment()
      .subtract({ [binSize]: index })
      .startOf(timeFrame)
      .format();
  });
};
