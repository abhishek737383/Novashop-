const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String, required: true },
  fullName:    { type: String, required: true },
  contactNo:   { type: String, required: true },
  city:        { type: String, required: true },
  state:       { type: String, required: true },
  pincode:     { type: String, required: true },
  address:     { type: String, required: true },
  size:        { type: String, required: true },
  color:       { type: String, required: true },
  createdAt:   { type: Date,   default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
