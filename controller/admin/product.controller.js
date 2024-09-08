// [GET]: /admin/products

const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus")
module.exports.index = async (req, res) => {
  console.log(req.query.status);


  // Đoạn bộ lọc


  const filterStatus = filterStatusHelper(req.query)

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }


  // Đoạn search

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
