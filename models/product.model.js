const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
  deleteAt:Date
});
// Tham số thứ 3 trongt phần này là tên của collection trong database product-management
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
