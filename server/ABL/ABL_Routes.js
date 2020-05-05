const db = require("../db");
const router = require("express").Router();
const moment = require("moment");

router.get("/api/AblComponent/all-items", async (req, res) => {
  db.query("SELECT * FROM abl", (err, ablItems) => {
    if (err) {
      console.log(err);
    } else {
      db.query("SELECT * FROM abl_transactions", (err, ablTransactions) => {
        if (err) {
          console.log(err);
        } else {
          ablItems.forEach(item => {
            const transactions = ablTransactions.filter(
              transaction => transaction.lotNum === item.lotNum
            );
            item.transactions = transactions;
          });
          res.send(ablItems);
        }
      });
    }
  });
});

router.get("/api/AblComponent/all-items-no-transactions", (req, res) => {
  db.query("SELECT * FROM abl", (err, ablItems) => {
    if (err) {
      console.error(err);
    } else {
      res.send(ablItems);
    }
  });
});

router.get("/api/AblComponent/generate-random-transactions", (req, res) => {
  const newTransactionType = ["used", "received"];
  const query = "SELECT * FROM abl;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const transactions = result.map(ablItem => {
        const arr = [];
        const numTransactions = 500;
        let count = 0; //  Create numTransactions for each unique lot number
        while (count < numTransactions) {
          const newTransaction = {
            transactionType: newTransactionType[Math.floor(Math.random() * 2)],
            quantityInStock: null,
            timestamp: moment()
              .subtract({ hours: Math.floor(Math.random() * 8760) })
              .valueOf()
          };
          if (newTransaction.transactionType === "used") {
            // newTransaction.amount = Math.floor(Math.random() * 4.5 + 1);
            // newTransaction.numBoxesReceived = null;
            switch (true) {
              case ablItem.countPerBox < 3:
                newTransaction.amount = Math.floor(Math.random() * 4.5 + 1);
                newTransaction.numBoxesReceived = null;
                break;
              case ablItem.countPerBox >= 3 && ablItem.countPerBox < 5:
                newTransaction.amount = Math.floor(Math.random() * 10 + 1);
                newTransaction.numBoxesReceived = null;
                break;
              case ablItem.countPerBox >= 5 && ablItem.countPerBox < 10:
                newTransaction.amount = Math.floor(Math.random() * 22 + 1);
                newTransaction.numBoxesReceived = null;
                break;
              default:
                break;
            }
          } else {
            newTransaction.numBoxesReceived = Math.floor(Math.random() * 2 + 1);
            newTransaction.amount = null;
          }
          arr.push({ lotNum: ablItem.lotNum, ...newTransaction });
          count++;
        }
        return { lotNum: ablItem.lotNum, transactions: arr };
      });

      //  SORT TRANSACTIONS BY TIMESTAMP
      transactions.forEach(item =>
        item.transactions.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
      );

      //  SET quantityInStock PROPERTY OF TRANSACTION AND QUANTITY PROPERTY OF EACH AblComponent ITEM
      transactions.forEach(itemTransactions => {
        const item = result.find(
          item => item.lotNum === itemTransactions.lotNum
        );
        itemTransactions.transactions.forEach(transaction => {
          if (transaction.transactionType === "used") {
            item.quantity -= transaction.amount;
            transaction.quantityInStock = item.quantity;
          } else {
            item.quantity += transaction.numBoxesReceived * item.countPerBox;
            transaction.quantityInStock = item.quantity;
          }
        });
      });

      transactions.forEach(item => {
        item.transactions.forEach(
          ({
            lotNum,
            transactionType,
            amount,
            numBoxesReceived,
            quantityInStock,
            timestamp
          }) => {
            const sql =
              "INSERT INTO abl_transactions (lotNum, transactionType, amount, numBoxesReceived, quantityInStock, timestamp) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(
              sql,
              [
                lotNum,
                transactionType,
                amount,
                numBoxesReceived,
                quantityInStock,
                timestamp
              ],
              (err, results) => {
                if (err) {
                  console.log(err);
                  res.send(err);
                } else {
                  const msg = "AblComponent transactions created";
                  console.log(msg);
                }
              }
            );
          }
        );
      });

      result.forEach(({ quantity, lotNum }) => {
        const sql = "UPDATE abl SET quantity = ? WHERE lotNum = ?";
        db.query(sql, [quantity, lotNum], (err, result) => {
          if (err) {
            res.send(err);
          } else {
            console.log(`Updated ${lotNum} quantity to: ${quantity}`);
          }
        });
      });
      res.send(transactions);
    }
  });
});

module.exports = router;
