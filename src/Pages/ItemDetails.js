import React from "react";
import { Card, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import ChartContainer from "../Components/ChartContainer";
import ItemSummaryInfo from "../Components/ItemSummaryInfo";
import ItemBasicStats from "../Components/ItemBasicStats";

const ItemDetails = props => {
  //  GET ALL DATA FOR A SPECIFIC ANALYZER
  //  SEPARATE ITEMS INTO CURRENT LOT AND NEW LOT - STORE EACH IN SEPARATE ARRAYS
  const { items } = props;
  const item = items[props.match.params.id];
  const currentLotItem = item.filter(
    item => item.isCurrentLot === true && item.isNewLot === false
  )[0];
  const newLotItem = item.filter(
    item => item.isCurrentLot === false && item.isNewLot === true
  )[0];

  return (
    <section>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#currentLot">
            <Nav.Item>
              <Nav.Link href="#currentLot">Current Lot</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled={newLotItem ? false : true} href="#newLot">
                New Lot
              </Nav.Link>
            </Nav.Item>
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
