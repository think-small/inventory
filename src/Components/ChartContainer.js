import React, { useState } from "react";
import Chart from "./Chart";
import { Form } from "react-bootstrap";

const ChartContainer = props => {
  const [chartType, setChartType] = useState("usage");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "75% 25%" }}>
      <Chart currentLotItem={props.currentLotItem} chartType={chartType} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
          justifyContent: "center"
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
        </Form>
        <div>Render Custom Chart Controls Here</div>
      </div>
    </div>
  );
};

export default ChartContainer;
