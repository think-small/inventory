const router = require("express").Router();
const controller = require("./controller");

router.get("/api/Architect/all-items", controller.allItems);
router.get(
  "/api/Architect/all-items-no-transactions",
  controller.allItemsNoTransactions
);
router.get("/api/Architect/all-transactions", controller.allTransactions);
router.get(
  "/api/Architect/generate-random-transactions",
  controller.generateRandomTransactions
);
router.get("/api/Architect/:name", controller.getSpecificItem);


router.post("/api/post/Architect", controller.postNewLot); 


module.exports = router;
