const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug:"title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt:Date
}, {
  // B24 phút 44 trở đi
  timestamps: true
});
// Tham số thứ 3 trongt phần này là tên của collection trong database product-management
const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
