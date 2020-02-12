import React from "react";
import Chart from "./Chart";
import { Form } from "react-bootstrap";

const ChartContainer = props => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "75% 25%" }}>
      <Chart currentLotItem={props.currentLotItem} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around"
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
            />
            <Form.Check
              inline
              custom
              type="radio"
              label="in stock chart"
              name="chart-type"
              id="in-stock-chart"
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default ChartContainer;
