const express = require("express");
const router  = express.Router();
const { create, getAll } = require("../controllers/orderController");

router.post("/", express.json(), create);
router.get("/", getAll);

module.exports = router;
