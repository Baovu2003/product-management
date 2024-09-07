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
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    console.log(index);
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    console.log(index);
    filterStatus[index].class = "active";
  }

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";

  if (req.query.keyword) {
    keyword = req.query.keyword;
   
     //      keyword: là từ khóa tìm kiếm mà người dùng nhập.
    // "i": flag ignore case, có nghĩa là không phân biệt chữ hoa chữ thường.
    const regex = new RegExp(keyword, "i");
    
    find.title = regex;
  }

  const products = await Product.find(find);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: keyword,
  });
  // res.send("Trang sản phẩm")
};
