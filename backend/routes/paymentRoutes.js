const express = require("express");
const multer  = require("multer");
const upload  = multer(); // in-memory
const { create, getAll } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", upload.single("screenshot"), create);
router.get("/", getAll);

module.exports = router;
