import React, { useContext } from "react";
import { ItemsContext } from "../Contexts/ItemsContext";

const Dashboard = () => {
  const { items } = useContext(ItemsContext);
  return (
    <section>
      Testing to ensure ItemsContext is properly passing data to children.
      <ul>
        {items.map(item => (
          <li
            key={item.orderID}
          >{`Name: ${item.name} Lot: ${item.lotNum} Expiration: ${item.expirationDate}`}</li>
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
