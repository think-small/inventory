const db = require("../db");
const router = require("express").Router();

router.get("/api/Utility/all-items", (req, res) => {
  db.query("SELECT * FROM abl UNION SELECT * FROM architect;", (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.send(items);
    }
  });
});

module.exports = router;
