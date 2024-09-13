const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET]: /admin/products
module.exports.index = async (req, res) => {
  console.log(req.query.status);

  // Đoạn bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Đoạn search
  // Sử dụng searchHelper để xử lý logic tìm kiếm
  const objectSearch = searchHelper(req.query, find);
  console.log("objectSearch:", objectSearch);
  // Nếu có regex từ objectSearch (tức là có từ khóa tìm kiếm)
  if (objectSearch.regex) {
    find.title = objectSearch.regex; // Thêm điều kiện tìm kiếm vào find
  }

  //------------------------ PAGINATION----------------------------------

  let objectPagination = {
    currentPage: 1,
    limitItems: 4,
  };

  if (req.query.page) {
    objectPagination.currentPage = Number(req.query.page) || 1;
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;
  console.log(objectPagination.currentPage);

  // Đếm tổng số lượng product trong db
  const countProduct = await Product.countDocuments(find);
  console.log("countProduct", countProduct);

  // Tính số lượng page
  const totalPage = Math.ceil(countProduct / objectPagination.limitItems);
  console.log("totalPage", totalPage);
  objectPagination.totalPage = totalPage;

  // --------------------------End------------------------------
  const products = await Product.find(find)
    .limit(4)
    .skip(objectPagination.skip);
  res.render("admin/pages/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// --------------------------/admin/change-status/:status/:id-------------------------------------------
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  console.log({ status, id });
  await Product.updateOne({ _id: id }, { status: status });

  // dùng back sẽ chuyển hướng yêu cầu trở lại ngay trang trước
  // Vì vậy nếu đang ở trang 2 thì nếu update status nó vẫn ở nguyên trang đó kaka
  res.redirect("back");
  // res.redirect('/admin/products')
};

// --------------------------/admin/change-multi--------------------------------------
module.exports.changeMulti = async (req, res) => {
  console.log("req.body", req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  console.log({type, ids})
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "deleteAll":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: "true" });
    default:
      break;
  }
  res.redirect("back");
  // res.send("ok")
};

module.exports.deleteItem = async (req, res) => {
  console.log("req.body", req.params);
  const id = req.params.id
  console.log("id: ",id)
  // Xoá vĩnh viễn
  // await Product.deleteOne({ _id: id }, { deleted: "true" });
  // Xoá mềm
  await Product.updateOne({ _id: id }, {
     deleted: "true",
     deleteAt: new Date()
    
    });
  res.redirect("back");
  // res.send("ok")
};

