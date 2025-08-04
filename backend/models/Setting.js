const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  upiId:    { type: String, required: true },
  qrCodeUrl:{ type: String, required: true },
});

module.exports = mongoose.model("Setting", settingSchema);
