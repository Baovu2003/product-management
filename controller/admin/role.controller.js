const Role = require("../../models/roles.model");
const systemconfig = require("../../config/system")
// [GET]: /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const role = await Role.find(find);
  console.log(role);
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Trang phân quyền",
    records: role,
  });
};

module.exports.create = async (req, res) => {
    let find = {
      deleted: false,
    };
    const role = await Role.find(find);
    console.log(role);
    res.render("admin/pages/roles/create.pug", {
      pageTitle: "Tạo quyền",
      records: role,
    });
  };

  module.exports.createPost = async (req, res) => {
    const record = new Role(req.body)
    await record.save();
    res.redirect(`${systemconfig.prefixAdmin}/roles`);
  };