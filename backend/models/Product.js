// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:       { type: String,   required: true },
  price:      { type: Number,   required: true },
  size:       { type: String,   required: true },    // ← new
  imageUrls:  { type: [String], required: true },  // array of URLs
  createdAt:  { type: Date,     default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
