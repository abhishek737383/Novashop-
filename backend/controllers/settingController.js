// backend/controllers/settingController.js
const Setting    = require("../models/Setting");
const cloudinary = require("../config/cloudinary");

exports.get = async (req, res) => {
  try {
    let s = await Setting.findOne();
    if (!s) s = await new Setting({ upiId: "", qrCodeUrl: "" }).save();
    res.json(s);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { upiId } = req.body;
    // upload qrCode file if present
    let qrCodeUrl = req.body.qrCodeUrl;  // fallback if you keep it
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "settings" },
          (error, result) => error ? reject(error) : resolve(result)
        );
        stream.end(req.file.buffer);
      });
      qrCodeUrl = uploadResult.secure_url;
    }

    let s = await Setting.findOne();
    if (!s) {
      s = new Setting({ upiId, qrCodeUrl });
    } else {
      s.upiId     = upiId;
      s.qrCodeUrl = qrCodeUrl;
    }
    await s.save();
    res.json(s);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
