const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId:        { type: String, required: true },
  transactionId:  { type: String, required: true },
  screenshotUrl:  { type: String, required: true },
  createdAt:      { type: Date,   default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
