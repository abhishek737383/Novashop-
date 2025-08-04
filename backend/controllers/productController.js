const Product    = require("../models/Product");
const cloudinary = require("../config/cloudinary");

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  console.log("Fields:", req.body);
  console.log("Files:", req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No images received under field 'images'" });
  }

  try {
    // Upload each to Cloudinary
    const uploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "my-shop" })
      )
    );
    const imageUrls = uploads.map((u) => u.secure_url);

    const prod = new Product({
      name:      req.body.name,
      price:     req.body.price,
      size:      req.body.size,      // ← include size here
      imageUrls,              // array of URLs
    });
    const saved = await prod.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error("Controller error:", err);
    return res.status(500).json({ message: err.message });
  }
};
exports.delete = async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};