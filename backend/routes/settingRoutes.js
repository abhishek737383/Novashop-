// backend/routes/settingRoutes.js
const express = require("express");
const multer  = require("multer");
const upload  = multer(); // in-memory
const { get, update } = require("../controllers/settingController");
const router = express.Router();

router.get("/", get);
// now accepts a file named "qrCode"
router.put("/", upload.single("qrCode"), update);

module.exports = router;
