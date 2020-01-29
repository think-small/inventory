const express = require ('express');
const DB = require ( './db');
const router = express.Router();

const path = require('path')


const app = express()


exports.router = router; 
  


router.get('/ABL', (req,res )=> {
    res.send("Testing Purposes: if this is showing then something is wrong....should be using front-end routing,not backend route???, should have not switched to backend route");
})



// testing route
router.get('/api/hello', (req, res, next) => {
    res.json('World');
});



router.get('/api/Stuff', async (req, res) => {           //*review async and await , everything works from backend now go to the frontend
// this gets the values from the database
try {
    let Inventory = await DB.Inventory.all();
res.json(Inventory);
}
catch(err) {
    res.json("there is an error ")
    console.log(err);
}
});


/**
router.post('/api/title', function(req, res){
    var title=req.body.title;
  //  var body = req.body.body; 
    Connection.query("INSERT INTO `blog` (title) VALUES (?)",title.toString(), function(err, result){
        if(err) throw err;
            console.log("1 (right now) record inserted");
        });
    res.send(title);
});
**/



//export default router;