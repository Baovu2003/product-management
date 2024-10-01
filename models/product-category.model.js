const mongoose = require("mongoose");
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: {
    type:String,
    default: ""
  },
  description: String,
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
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema, "products-category");
module.exports = ProductCategory;
