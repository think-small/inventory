import React, { useState } from "react";
import { Form } from "react-bootstrap";
import EditItemQuantityComponent from "./edit-item-quantity/edit-item-quantity.component";

const ManualTransactionItem = props => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(isChecked => !isChecked);
  };

  return (
    <>
      <div>
        <Form.Check
          type="checkbox"
          label={props.label}
          onChange={handleClick}
          style={{
            display: "inline-block",
            marginRight: "2em",
            marginTop: "1.5em"
          }}
        />
        {isChecked && <EditItemQuantityComponent />}
      </div>
    </>
  );
};

export default ManualTransactionItem;
