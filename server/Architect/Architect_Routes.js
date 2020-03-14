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
  const query = "SELECT * FROM architect;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const transactions = result.map(archItem => {
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
          arr.push({ lot_num: archItem.lot_num, ...newTransaction });
          count++;
        }
        return { lot_num: archItem.lot_num, transactions: arr };
      });

      //  SORT TRANSACTIONS BY TIMESTAMP
      transactions.forEach(item =>
        item.transactions.sort((a, b) =>
          moment(a.timestamp).valueOf() < moment(b.timestamp).valueOf() ? -1 : 1
        )
      );

      //  SET QUANTITY_IN_STOCK PROPERTY OF TRANSACTION AND QUANTITY PROPERTY OF EACH ARCHITECT ITEM
      transactions.forEach(itemTransactions => {
        const item = result.find(
          item => item.lot_num === itemTransactions.lot_num
        );
        itemTransactions.transactions.forEach(transaction => {
          if (transaction.transaction_type === "used") {
            item.quantity -= transaction.amount;
            transaction.quantity_in_stock = item.quantity;
          } else {
            item.quantity +=
              transaction.num_boxes_received * item.count_per_box;
            transaction.quantity_in_stock = item.quantity;
          }
        });
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

      result.forEach(({ quantity, lot_num }) => {
        const sql = "UPDATE Architect SET quantity = ? WHERE lot_num = ?";
        db.query(sql, [quantity, lot_num], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            console.log(`Updated ${lot_num} quantity to: ${quantity}`);
          }
        });
      });
      res.send(transactions);
    }
  });
});

/*
 * API PARAMS
 * name - reagent name
 * lotNum (query string) reagent's lot number
 */
router.get("/api/Architect/:name", (req, res) => {
  console.log(req.params.name);
  console.log(req.query.lotNum);
  const sql = `SELECT * FROM architect_transactions WHERE lot_num = ?`;
  db.query(sql, [req.query.lotNum], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
