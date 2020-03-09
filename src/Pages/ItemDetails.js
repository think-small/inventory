import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import ChartContainer from "../Components/ChartContainer";
import ItemSummaryInfo from "../Components/ItemSummaryInfo";
import ItemBasicStats from "../Components/ItemBasicStats";

const ItemDetails = props => {
  const [key, setKey] = useState("currentLot");
  const history = useHistory();
  console.log(key);

  //  GET ALL DATA FOR A SPECIFIC ANALYZER
  //  SEPARATE ITEMS INTO CURRENT LOT AND NEW LOT - STORE EACH IN SEPARATE ARRAYS

  const { param, items } = props.location.state;
  const queryString = new URLSearchParams(props.location.search).get('lotNum');
  const isNewLot = items.find(entry => entry.lotNum === queryString && entry.isNewLot);

  const newLotItem = items.filter(
    item => item.isCurrentLot === false && item.isNewLot === true
  )[0];

  const currentLotItem = isNewLot
    ? items.filter(
        item => item.isCurrentLot === false && item.isNewLot === true
      )[0]
    : items.filter(
        item => item.isCurrentLot === true && item.isNewLot === false
      )[0];

const handleSelect = (e) => {
  const queryString = e === "currentLot" ? currentLotItem.lotNum : newLotItem.lotNum;
  history.push({
    pathname: `/Architect/${param}?lotNum=${queryString}`,
    state: {
      param,
      items
    }
  })
}

  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" activeKey={key} onSelect={k => setKey(k)}>
              <Nav.Link eventKey={"currentLot"} onSelect={handleSelect}>
                <Nav.Item>Current Lot</Nav.Item>
              </Nav.Link>
              <Nav.Link eventKey={"newLot"} disabled={!newLotItem} onSelect={handleSelect}>
                <Nav.Item>New Lot</Nav.Item>
              </Nav.Link>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title className="item-title">
            {currentLotItem.displayName}
          </Card.Title>
          <section className="item-summary-and-stats">
            <div className="item-summary">
              <ItemSummaryInfo currentLotItem={currentLotItem} />
            </div>
            <div className="item-summary">
              <ItemBasicStats currentLotItem={currentLotItem} />
            </div>
          </section>
        </Card.Body>
        <ChartContainer currentLotItem={currentLotItem} />
      </Card>
    </section>
  );
};

export default withRouter(ItemDetails);
