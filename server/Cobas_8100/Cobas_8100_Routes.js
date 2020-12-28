var express = require('express');
var router = express.Router();
var connection = require('../db.js');




router.get('/api/8100',(req, results) => {
  connection.query('SELECT * from Cobas_8100 ', (error, Cobas8100)=> {
    if (error) {
      results.send(error); 
    }
    else {
      // change this part later 
    //  connection.query("SELECT * FROM abl_transactions", (err, ablTransactions) => {
       
        var sqlquery = 'SELECT Cobas_8100_Transactions.id,  Cobas_8100.lotNum, Cobas_8100_Transactions.transactionType,Cobas_8100_Transactions.expirationDate,  Cobas_8100.quantity,  Cobas_8100.displayName, Cobas_8100_Transactions.amount, Cobas_8100_Transactions.quantityInStock, Cobas_8100_Transactions.timestamp FROM Cobas_8100 INNER JOIN Cobas_8100_Transactions ON Cobas_8100.lotNum = Cobas_8100_Transactions.lotNum';
    
        connection.query(sqlquery, (err, ablTransactions) => {
        if (err) {
          console.log(err);
        } else {
          Cobas8100.forEach(item => {
            const transactions = ablTransactions.filter(
              transaction => transaction.lotNum === item.lotNum
            );
            item.transactions = transactions;
          });
          results.send(Cobas8100);
        }
      });  
    }
  })
})

//joinng the Cobas_8100 mysql table with the Cobas_8100_Transactions mysql table
router.get('/api/8100_all',(req, res) => {
     var sql = 'SELECT Cobas_8100_Transactions.id,  Cobas_8100_Transactions.transactionType, Cobas_8100.lotNum, Cobas_8100_Transactions.expirationDate,  Cobas_8100.quantity,  Cobas_8100.displayName, Cobas_8100_Transactions.amount, Cobas_8100_Transactions.quantityInStock, Cobas_8100_Transactions.timestamp FROM Cobas_8100 INNER JOIN Cobas_8100_Transactions ON Cobas_8100.lotNum = Cobas_8100_Transactions.lotNum';
    
     connection.query(sql, (error, results)=> {
         if (error) {
           res.send(error); 
         }
         else
         {
     res.json(results);
        }
       })
  })  


  
router.post('/api/post/8100', (req,res)=> {
   
       const id = req.body.Id;    //may not need this.mysql should auto-increment
       const Name = req.body.Name;
       const Lot = req.body.Lot;  
       const Quantity = req.body.Quantity;
       const Expiration_Date = req.body.Expiration;
       const orderID = req.body.OrderID; 
       const reagentname = req.body.ReagentName;
    
   connection.query('INSERT INTO Cobas_8100 (id, reagentName, displayName, lotNum,  quantity, isCurrentLot, isNewLot, par, countPerBox,   expirationDate, orderID ,warning ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)' , 
     [id, reagentname, Name, Lot, Quantity, req.body.isCurrentLot, req.body.isNewLot, req.body.par, req.body.countPerBox,  Expiration_Date, orderID,'Not Expired', ],(error, result)=> {
      if (error) {
        res.send(error);
        console.log(error); 
      }
      else {
        console.log('Created a new Lot!');
        //console.log(result);
      }
      
  })


// updates all columns based on this condition
connection.query('UPDATE Cobas_8100 set warning = ?  WHERE timeLeft <= 7' , 
      ['Expires Soon!'],(error, result)=> {
       if (error) {
         res.send(error);
         console.log(error); 
       }
       else {
       //   console.log('the update worked!!');
        // console.log(result);
       }
       
       })
 
connection.query('UPDATE Cobas_8100 set warning = ?  WHERE timeLeft < 0' , 
       ['Expired!'],(error, result)=> {
        if (error) {
          res.send(error);
          console.log(error); 
        }
        else {
         // console.log('the update worked!!');
         // console.log(result);
        }
        
        })
   
     });


//had to change route from /api/post/Cobas_8100_Tranactions to /o because for some reason it was not working...
router.post(`/Cobas_8100_Transactions`, (req,res) => {

  //console.log('the expiration value is' + req.body.Expiration); 
  connection.query(`INSERT Cobas_8100_Transactions (lotNum, transactiontype, expirationDate,  amount, quantityInStock) VALUES (?,?,?,?,?)`, [req.body.Lot,'used',req.body.Expiration, req.body.Amount, req.body.Amount],  (error, results)=> {
    if (error)  {
    return console.error(error.message); }
    else {
    console.log('Post into the Cobas_8100_Tranactions table worked');
    }

  })
  }
  )


router.put('/api/update/8100', (req,res)=> {
    let Quantity = req.body.Quantity; 
    let Id = req.body.Id; 
    let Lot = req.body.Lot; 


//if Quantity is empty that means the that the Expiration input is being filled from from the frontend... 
    if (req.body.Quantity ==="") {
      connection.query(`UPDATE Cobas_8100 SET expirationDate  =? WHERE Id = ?`, [ req.body.Expiration, Id], (error, results) =>{
            if (error) 
            return console.error(error.message);
            console.log("Expiration Date updated to" + " " + req.body.Expiration   + " in lot" + " " + req.body.Lot);
    } )
  }

//if Expiration is empty that means that there is a value for the Quantity, so update the Quantity
    if (req.body.Expiration ==="") {
        connection.query(`UPDATE Cobas_8100 SET quantity  =? WHERE Id = ?`, [ Quantity, Id], (error, results) =>{
              if (error) 
              return console.error(error.message);
              console.log('Quantity updated to' + " " +  Quantity  + " in lot" + " " + req.body.Lot);
    } )
    }
  

// Also, update the Warning column, when you hit the Update Expiration Date on the Client side
  connection.query('UPDATE Cobas_8100 set warning = ?  WHERE timeLeft > 7' , 
  ['Good!'],(error, result)=> {
   if (error) {
     res.send(error);
     console.log(error); 
   }
   else {
      //console.log('Post worked!!');
    // console.log(result);
   }
   
   })
  
    connection.query('UPDATE Cobas_8100 set warning = ?  WHERE timeLeft <= 7' , 
    ['Expires Soon!'],(error, result)=> {
     if (error) {
       res.send(error);
       console.log(error); 
     }
     else {
       //console.log('Post worked!!');
     //  console.log(result);
     }
     
     })
  
     connection.query('UPDATE Cobas_8100 set warning = ?  WHERE timeLeft <= 0' , 
     ['Expired!'],(error, result)=> {
      if (error) {
        res.send(error);
        console.log(error); 
      }
      else {
     //   console.log('Post worked!!');
       // console.log(result);
      }
      
      })
  
  })




  router.delete('/api/delete/8100', (req,res)=> {
    
    let sql = `DELETE FROM Cobas_8100 WHERE id = ?`;
    let id = req.body.Id; 

  
  connection.query(sql, id, (error, results, fields) => {
      if (error)
        return console.error(error.message);
        console.log('Deleted Row(s):', results.affectedRows + " " + " from the Cobas_8100 table");
    });
  
  })
  
  
  router.delete('/api/delete/Cobas_8100_', (req,res)=> {

    let sql = `DELETE FROM Cobas_8100_Transactions WHERE lotNum  = ?`;
    let Lot = req.body.Lot; 
    //console.log(Lot)

  connection.query(sql, Lot, (error, results) => {
      if (error)
        return console.error(error.message);
     
      console.log('Deleted Row(s):', results.affectedRows + " " + "from the Cobas_8100_Transactions table" );
    });
  
  })
  


  
module.exports = router;