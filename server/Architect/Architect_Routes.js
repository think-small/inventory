const db = require("../db.js");
const router = require("express").Router();
const moment = require("moment");

router.get("/api/Architect/all-items", (req, res) => {
  res.send("Fetching all architect items");
});

router.get("/api/Architect/all-transactions", (req, res) => {
  db.query("SELECT * FROM architect_transactions", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

//  Generate random transactions for each unique lot number
router.get("/api/Architect/generate-random-transactions", (req, res) => {
  const newTransactionType = ["used", "received"];
  const query = "SELECT lot_num FROM architect;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const transactions = result.map(lotNumber => {
        const arr = [];
        let count = 0; //  Create 200 transactions for each unique lot number
        while (count < 200) {
          const newTransaction = {
            transaction_type: newTransactionType[Math.floor(Math.random() * 2)],
            quantity_in_stock: null,
            timestamp: moment()
              .subtract({ hours: Math.floor(Math.random() * 8760) })
              .format("YYYY-MM-DD HH:mm:ss")
          };
          if (newTransaction.transaction_type === "used") {
            newTransaction.amount = Math.floor(Math.random() * 4.5 + 1);
            newTransaction.num_boxes_received = null;
          } else {
            newTransaction.num_boxes_received = Math.floor(
              Math.random() * 2 + 1
            );
            newTransaction.amount = null;
          }
          arr.push({ ...lotNumber, ...newTransaction });
          count++;
        }
        return { lot_num: lotNumber.lot_num, transactions: arr };
      });

      transactions.forEach(item => {
        item.transactions.forEach(
          ({
            lot_num,
            transaction_type,
            amount,
            num_boxes_received,
            quantity_in_stock,
            timestamp
          }) => {
            const sql =
              "INSERT INTO architect_transactions (lot_num, transaction_type, amount, num_boxes_received, quantity_in_stock, timestamp) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(
              sql,
              [
                lot_num,
                transaction_type,
                amount,
                num_boxes_received,
                quantity_in_stock,
                timestamp
              ],
              (err, results) => {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  const msg = "Architect transactions created";
                  console.log(msg);
                }
              }
            );
          }
        );
      });
      res.send(JSON.stringify(transactions));
    }
  });
});

module.exports = router;
