import React, { useState } from "react";
import Chart from "./Chart";
import { Form } from "react-bootstrap";

const ChartContainer = props => {
  //  DEFAULT CHART -> USAGE WITH WEEK RANGE
  const [chartType, setChartType] = useState("usage");
  const [dateRange, setDateRange] = useState(7);

  const handleSelect = e => {
    setDateRange(Number(e.target.value));
  };

  return (
    <div className="chart-container">
      <div>
        <Chart
          itemToDisplay={props.itemToDisplay}
          chartType={chartType}
          dateRange={dateRange}
        />
      </div>
      <div className="chart-controls">
        <Form>
          <Form.Group className="chart-type-selectors">
            <Form.Label className="chart-label">Chart Type</Form.Label>
            <Form.Check
              custom
              defaultChecked
              type="radio"
              label="usage chart"
              name="chart-type"
              id="usage-chart"
              value="usage"
              onChange={() => setChartType("usage")}
              className="chart-type-selector"
            />
            <Form.Check
              custom
              type="radio"
              label="in stock chart"
              name="chart-type"
              id="in-stock-chart"
              value="inStock"
              onChange={() => setChartType("inStock")}
              className="chart-type-selector"
            />
            <Form.Check
              custom
              type="radio"
              label="received data"
              name="chart-type"
              id="received-chart"
              value="received"
              onChange={() => setChartType("received")}
              className="chart-type-selector"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="chart-label">Time Range</Form.Label>
            <Form.Control as="select" defaultValue="7" onChange={handleSelect}>
              <option name="day" value="1">
                Day
              </option>
              <option name="week" value="7">
                Week
              </option>
              <option name="month" value="30">
                Month
              </option>
              <option name="year" value="365">
                Year
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
        <div>Render Custom Chart Controls Here</div>
      </div>
    </div>
  );
};

export default ChartContainer;
