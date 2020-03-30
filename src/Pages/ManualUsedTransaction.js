import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

const ManualUsedTransaction = () => {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [instrument, setInstrument] = useState("Architect");
  const [isCurrentLot, setIsCurrentLot] = useState(true);
  const instrumentRef = useRef();
  const currentLotRef = useRef();
  const itemMapping = useRef({
    architect: [],
    abl: [],
    cobas8000: [],
    cobas8100: []
  });

  //  MANAGE SIDE EFFECTS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/Utility/all-items");
        const AllItems = await data.json();
        setItems([...AllItems]);

        const architectItems = await fetch(
          "/api/Architect/all-items-no-transactions"
        );
        const ablItems = await fetch("/api/ABL/all-items-no-transactions");
        const architectItemData = await architectItems.json();
        const ablItemData = await ablItems.json();

        itemMapping.current.architect = architectItemData.map(
          item => item.reagentName
        );
        itemMapping.current.abl = ablItemData.map(item => item.reagentName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    switch (instrument) {
      case "Architect":
        console.log(items);
        console.log(itemMapping.current);
        setCurrentItems(
          items.filter(item =>
            itemMapping.current.architect.includes(item.reagentName)
          )
        );
        break;
      case "ABL 800":
        setCurrentItems(
          items.filter(item =>
            itemMapping.current.abl.includes(item.reagentName)
          )
        );
        break;
      default:
        break;
    }
  }, [instrument]);

  //  EVENT HANDLERS
  const handleInstrumentSelect = e => {
    setInstrument(e.target.value);
  };

  const handleCheckbox = () => {
    setIsCurrentLot(isCurrentLot => !isCurrentLot);
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Instrument</Form.Label>
          <Form.Control
            ref={instrumentRef}
            as="select"
            onChange={handleInstrumentSelect}
          >
            <option>Architect</option>
            <option>ABL 800</option>
            <option disabled>Cobas 8000</option>
            <option disabled>Cobas 8100</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check
            ref={currentLotRef}
            inline
            checked={isCurrentLot}
            onChange={handleCheckbox}
            label="current lot"
            type="checkbox"
          />
        </Form.Group>
      </Form>
      <div>Current Instrument: {instrument}</div>
      {currentItems.length > 0
        ? currentItems.map(item => <div>{item.displayName}</div>)
        : "No items..."}
    </>
  );
};

export default ManualUsedTransaction;
