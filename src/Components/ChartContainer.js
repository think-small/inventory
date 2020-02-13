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
    <div style={{ display: "grid", gridTemplateColumns: "60% 40%" }}>
      <div>
        <Chart
          currentLotItem={props.currentLotItem}
          chartType={chartType}
          dateRange={dateRange}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <Form>
          <Form.Group>
            <Form.Check
              inline
              custom
              defaultChecked
              type="radio"
              label="usage chart"
              name="chart-type"
              id="usage-chart"
              value="usage"
              onChange={() => setChartType("usage")}
            />
            <Form.Check
              inline
              custom
              type="radio"
              label="in stock chart"
              name="chart-type"
              id="in-stock-chart"
              value="inStock"
              onChange={() => setChartType("inStock")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time Range</Form.Label>
            <Form.Control as="select" onChange={handleSelect}>
              <option disabled name="day" value="1">
                Day
              </option>
              <option defaultChecked name="week" value="7">
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
