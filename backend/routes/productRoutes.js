const express = require("express");
const multer  = require("multer");
const router  = express.Router();
const { getAll, create , delete: deleteProduct} = require("../controllers/productController");

// 1. Configure multer storage (you can tweak dest as needed)
const upload = multer({ dest: "/tmp/uploads" });

// 2. Use the .array() middleware, matching the form’s `name="images"`
//    and allowing up to 10 files (you can increase if needed)
router.get("/", getAll);
router.post("/", upload.array("images", 10), create);
router.delete("/:id", deleteProduct);

module.exports = router;
