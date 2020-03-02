import React from "react";
import { ListGroup } from "react-bootstrap";
import moment from "moment";
import { aggregateData, getRawData } from "../UtilityFunctions/DataCleaning";
import { calcAverage } from "../UtilityFunctions/Statistics";

const ItemBasicStats = ({
  currentLotItem: { transactions, countPerBox, warnings }
}) => {
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

  return (
    <ListGroup>
      <ListGroup.Item className="list-header">Statistics</ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Monthly Usage</span>
        <span>{monthlyUsage}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Monthly Units Received</span>
        <span>{monthlyReceived * countPerBox}</span>
      </ListGroup.Item>
      <ListGroup.Item className="list-row">
        <span>Last Warning</span>
        <span>
          {warnings.length > 0
            ? moment(warnings[warnings.length - 1].timestamp).format(
                "YYYY-MM-DD, h:mm A"
              )
            : "None"}{" "}
          || {warnings.length}
        </span>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ItemBasicStats;
