const ProductCategory = require("../../models/product-category.model");
const systemconfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find);
  console.log(records);

  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
  // res.send("OKKKK")
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  let find = {
    deleted: false,
  };

  // function createTree(arr, parentId = "") {
  //   const tree = [];
  //   arr.forEach((item) => {
  //     if (item.parent_id === parentId) {
  //       const newItem = item;
  //       console.log("newItem", newItem);
  //       const children = createTree(arr, item.id);
  //       console.log("children", children);
  //       if (children.length > 0) {
  //         newItem.children = children;
  //       }
  //       tree.push(newItem);
  //     }
  //   });
  //   return tree;
  // }

  const records = await ProductCategory.find(find);
  console.log(records);

  const newRecords = createTreeHelper.tree(records);
  console.log(newRecords);
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục sản phẩm",
    records: newRecords,
  });
  // res.send("OKKKK")
};

module.exports.createUsePost = async (req, res) => {
  // console.log(req.file)
  console.log("req.body:", req.body);

  if (req.body.position == "") {
    const x = await ProductCategory.countDocuments();
    // console.log(x)
    req.body.position = x + 1;
  } else {
    req.body.position = Number(req.body.position);
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const category = new ProductCategory(req.body);
  await category.save();
  req.flash("success", `Create products successfully `);
  res.redirect(`${systemconfig.prefixAdmin}/products-category`);
  // res.send("Create use post");
};

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    const product = await ProductCategory.findOne(find).exec();
    console.log("productById: ", product);

    const records = await ProductCategory.find({
      deleted: false,
    });

    const newRecords = createTreeHelper.tree(records);
    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: "Edit danh mục sản phẩm",
      product: product,
      records: newRecords,
    });
  } catch (error) {
    req.flash("success", `Create products successfully `);
    res.redirect(`${systemconfig.prefixAdmin}/products-category`);
  }
};

module.exports.editUsePost = async (req, res) => {
  console.log("req.body:", req.body);

  if (req.body.position == "") {
    const x = await ProductCategory.countDocuments();
    // console.log(x)
    req.body.position = x+1
  } else {
    req.body.position = Number(req.body.position);
   
  }
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    await ProductCategory.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", `Update products-category successfully `);
  } catch (error) {
    res.redirect("back");
  }

  res.redirect(`${systemconfig.prefixAdmin}/products-category`);
};
