const Payment    = require("../models/Payment");
const cloudinary = require("../config/cloudinary");

// POST /api/payments
exports.create = async (req, res) => {
  try {
    // multer in-memory: req.file.buffer
    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "payments" },
        (err, result) => err ? reject(err) : resolve(result)
      );
      stream.end(req.file.buffer);
    });

    const p = new Payment({
      orderId:       req.body.orderId,
      transactionId: req.body.transactionId,
      screenshotUrl: upload.secure_url,
    });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/payments
exports.getAll = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
