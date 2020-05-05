const moment = require("moment");
const db = require("../db");

const allItems = async (req, res) => {
  db.query("SELECT * FROM architect", (err, architectItems) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "SELECT * FROM architect_transactions",
        (err, architectTransactions) => {
          if (err) {
            console.log(err);
          } else {
            architectItems.forEach(item => {
              const transactions = architectTransactions.filter(
                transaction => transaction.lotNum === item.lotNum
              );
              item.transactions = transactions;
            });
            res.send(architectItems);
          }
        }
      );
    }
  });
};

const allItemsNoTransactions = async (req, res) => {
  db.query("SELECT * FROM architect", (err, architectItems) => {
    if (err) {
      console.log(err);
    } else {
      res.send(architectItems);
    }
  });
};

const allTransactions = (req, res) => {
  db.query("SELECT * FROM architect_transactions", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
};

const generateRandomTransactions = (req, res) => {
  const newTransactionType = ["used", "received"];
  const query = "SELECT * FROM architect;";

  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const transactions = result.map(archItem => {
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
            newTransaction.amount = Math.floor(Math.random() * 4.5 + 1);
            newTransaction.numBoxesReceived = null;
          } else {
            newTransaction.numBoxesReceived = Math.floor(Math.random() * 2 + 1);
            newTransaction.amount = null;
          }
          arr.push({ lotNum: archItem.lotNum, ...newTransaction });
          count++;
        }
        return { lotNum: archItem.lotNum, transactions: arr };
      });

      //  SORT TRANSACTIONS BY TIMESTAMP
      transactions.forEach(item =>
        item.transactions.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1))
      );

      //  SET quantityInStock PROPERTY OF TRANSACTION AND QUANTITY PROPERTY OF EACH ARCHITECT ITEM
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
              "INSERT INTO architect_transactions (lotNum, transactionType, amount, numBoxesReceived, quantityInStock, timestamp) VALUES (?, ?, ?, ?, ?, ?)";
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
                  const msg = "ArchitectComponent transactions created";
                  console.log(msg);
                }
              }
            );
          }
        );
      });

      result.forEach(({ quantity, lotNum }) => {
        const sql = "UPDATE ArchitectComponent SET quantity = ? WHERE lotNum = ?";
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
};

/*
 * API PARAMS
 * name - reagent name
 * lotNum (query string) reagent's lot number
 */
const getSpecificItem = (req, res) => {
  console.log(req.params.name);
  console.log(req.query.lotNum);
  const sql = `SELECT * FROM architect_transactions WHERE lotNum = ?`;
  db.query(sql, [req.query.lotNum], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  allItems,
  allItemsNoTransactions,
  allTransactions,
  generateRandomTransactions,
  getSpecificItem
};
