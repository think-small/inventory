import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ABLContext } from "../Contexts/ABLContext";
import moment from "moment";
import Navbar from "../Navbar/Navbar"; 





const ABL = () => {



  const { ablItems } = useContext(ABLContext);
  const history = useHistory();

  const currentLotItems = Object.entries(ablItems).map(entry => {
    if (entry[1].length > 1) {
      return {
        ...entry[1].filter(item => item.isCurrentLot)[0],
        name: entry[0]
      };
    } else {
      return { ...entry[1][0], name: entry[0] };
    }
  });

  const handleClick = (e) => {
    const clickedDisplayName = e.currentTarget.querySelector("td").innerText;
    const clickedItem = Object.entries(ablItems).find(entry => {      
      return entry[1][0].displayName === clickedDisplayName
    })
    history.push({
      pathname: `/ABL/${clickedItem[0]}`,
      search: `lotNum=${clickedItem[1][0].lotNum}`,
      state: {
        param: clickedItem[0],
        items: clickedItem[1]
      }
    })
  }

 
   return (
     <div>
       <Navbar />
    <section>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Lot</th>
            <th>Expiration Date</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentLotItems.map(item => (            
              <tr key={item.orderID} style={{ cursor: "pointer" }} onClick={handleClick}>
                <td>{item.displayName}</td>
                <td>{item.lotNum}</td>
                <td>
                  {item.expirationDate
                    ? moment(item.expirationDate).format("MM/DD/YY")
                    : "---"}
                </td>
                <td>{item.quantity}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </section>





</div>


  );
};

export default ABL;
