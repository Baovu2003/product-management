const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  title: String,
  description: String,
  permission: {
    type: Array,
    default: []
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
const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;
