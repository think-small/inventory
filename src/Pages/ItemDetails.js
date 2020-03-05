import React, { useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router-dom";
import ChartContainer from "../Components/ChartContainer";
import ItemSummaryInfo from "../Components/ItemSummaryInfo";
import ItemBasicStats from "../Components/ItemBasicStats";

const ItemDetails = props => {
  const [key, setKey] = useState("currentLot");

  //  GET ALL DATA FOR A SPECIFIC ANALYZER
  //  SEPARATE ITEMS INTO CURRENT LOT AND NEW LOT - STORE EACH IN SEPARATE ARRAYS
  const { items } = props;
  const item = items[props.match.params.id];
  const isNewLot = props.match.params.lotNum;

  // const currentLotItem = item.filter(
  //   item => item.isCurrentLot === true && item.isNewLot === false
  // )[0];
  const newLotItem = item.filter(
    item => item.isCurrentLot === false && item.isNewLot === true
  )[0];

  const currentLotItem = isNewLot
    ? item.filter(
        item => item.isCurrentLot === false && item.isNewLot === true
      )[0]
    : item.filter(
        item => item.isCurrentLot === true && item.isNewLot === false
      )[0];

  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" active={key} onSelect={k => setKey(k)}>
            <LinkContainer exact to={`/Architect/${props.match.params.id}`}>
              <Nav.Link>
                <Nav.Item eventKey={"currentLot"}>Current Lot</Nav.Item>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              exact
              to={
                newLotItem
                  ? `/Architect/${props.match.params.id}/${newLotItem.lotNum}`
                  : "#"
              }
            >
              <Nav.Link disabled={!newLotItem}>
                <Nav.Item eventKey={"newLot"}>New Lot</Nav.Item>
              </Nav.Link>
            </LinkContainer>
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
