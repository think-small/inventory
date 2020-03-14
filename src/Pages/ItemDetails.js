import React, { useState, useRef } from "react";
import { Card, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ChartContainer from "../Components/ChartContainer";
import ItemSummaryInfo from "../Components/ItemSummaryInfo";
import ItemBasicStats from "../Components/ItemBasicStats";
import queryStringParser from "query-string";

const ItemDetails = props => {
  const { param, items } = props.location.state;

  const history = useHistory();
  const [key, setKey] = useState("currentLot");
  const currentLotItem = useRef(
    items.filter(item => item.isCurrentLot === true && item.isNewLot == false)
  );
  const newLotItem = useRef(
    items.filter(item => item.isCurrentLot == false && item.isNewLot == true)
  );

  const instrumentName = history.location.pathname.split("/")[1]; //  index = 1 grabs string after '/' in pathname
  const queryString = queryStringParser.parse(props.location.search);
  const isNewLot = items.find(
    entry => entry.lotNum === queryString.lotNum && entry.isNewLot
  );
  const itemToDisplay = isNewLot
    ? newLotItem.current[0]
    : currentLotItem.current[0];

  const handleSelect = e => {
    const queryString =
      e === "currentLot"
        ? currentLotItem.current[0].lotNum
        : newLotItem.current[0].lotNum;
    history.push({
      pathname: `/${instrumentName}/${param}`,
      search: `lotNum=${queryString}`,
      state: {
        param,
        items
      }
    });
  };

  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" activeKey={key} onSelect={k => setKey(k)}>
            <Nav.Link eventKey={"currentLot"} onSelect={handleSelect}>
              <Nav.Item>Current Lot</Nav.Item>
            </Nav.Link>
            <Nav.Link
              eventKey={"newLot"}
              disabled={!newLotItem.current[0]}
              onSelect={handleSelect}
            >
              <Nav.Item>New Lot</Nav.Item>
            </Nav.Link>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title className="item-title">
            {itemToDisplay.displayName}
          </Card.Title>
          <section className="item-summary-and-stats">
            <div className="item-summary">
              <ItemSummaryInfo itemToDisplay={itemToDisplay} />
            </div>
            <div className="item-summary">
              <ItemBasicStats itemToDisplay={itemToDisplay} />
            </div>
          </section>
        </Card.Body>
        <ChartContainer itemToDisplay={itemToDisplay} />
      </Card>
    </section>
  );
};

export default ItemDetails;
