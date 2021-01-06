const db = require("../db");
const { getAllItemsFor } = require("../Data/data-access");
const router = require("express").Router();
const moment = require("moment");

router.get("/", async (request, response) => {
  try {
    const items = await getAllItemsFor("ABL");
    return response.status(200).json(items);
  } catch(err) {
    return response.status(500).json({ message: "Unable to retrieve ABL items" });
  }
});

router.post('/', (req,res)=> {
   
 // const id = req.body.Id;    //may not need this.mysql should auto-increment
  const Name = req.body.Name;
  const Lot = req.body.Lot;  
  const Quantity = req.body.Quantity;
  const Expiration_Date = req.body.Expiration;
  const orderID = req.body.OrderID; 


  db.query('INSERT INTO Abl (reagentName, displayName, lotNum,  quantity, isCurrentLot, isNewLot, par, countPerBox,   expirationDate, orderID  ) VALUES (?,?,?,?,?,?,?,?,?,?)' , 
  [Name, Name, Lot, Quantity, req.body.isCurrentLot, req.body.isNewLot, req.body.par, req.body.countPerBox,  Expiration_Date, orderID, ],(error, result)=> {
   if (error) {
     res.send(error);
     console.log(error); 
   }
   else {
     console.log('Created a new lot for the Abl!');
     //console.log(result);
   }
  })
})

router.get("/api/ABL/all-items-no-transactions", (req, res) => {
  db.query("SELECT * FROM abl", (err, ablItems) => {
    if (err) {
      console.error(err);
    } else {
      res.send(ablItems);
    }
  });
});

module.exports = router;
