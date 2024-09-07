// [GET]: /admin/products

const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  console.log(req.query.status);

  let filterStatus = [
    {
      name: " Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(item => item.status == req.query.status);
    console.log(index);
    filterStatus[index].class="active"
  }else{
    const index = filterStatus.findIndex(item => item.status == "");
    console.log(index);
    filterStatus[index].class="active"
  }

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const products = await Product.find(find);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
  });
  // res.send("Trang sản phẩm")
};
