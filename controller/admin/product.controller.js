// [GET]: /admin/products

const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
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

   // Sử dụng searchHelper để xử lý logic tìm kiếm
  const objectSearch = searchHelper(req.query,find)
  console.log("objectSearch:",objectSearch);

  // Nếu có regex từ objectSearch (tức là có từ khóa tìm kiếm)
  if (objectSearch.regex) {
    
    find.title = objectSearch.regex; // Thêm điều kiện tìm kiếm vào find
  }

  const products = await Product.find(find);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
  });
};
