const router = require("express").Router();
const controller = require("./controller");

router.get("/api/ArchitectComponent/all-items", controller.allItems);
router.get(
  "/api/ArchitectComponent/all-items-no-transactions",
  controller.allItemsNoTransactions
);
router.get("/api/ArchitectComponent/all-transactions", controller.allTransactions);
router.get(
  "/api/ArchitectComponent/generate-random-transactions",
  controller.generateRandomTransactions
);
router.get("/api/ArchitectComponent/:name", controller.getSpecificItem);

module.exports = router;
