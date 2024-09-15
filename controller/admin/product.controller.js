const Product = require("../../models/product.model");
const systemconfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");

// [GET]: /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

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
  // console.log("objectSearch:", objectSearch);
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
  // console.log(objectPagination.currentPage);

  // Đếm tổng số lượng product trong db
  const countProduct = await Product.countDocuments(find);
  // console.log("countProduct", countProduct);

  // Tính số lượng page
  const totalPage = Math.ceil(countProduct / objectPagination.limitItems);
  // console.log("totalPage", totalPage);
  objectPagination.totalPage = totalPage;

  // --------------------------End------------------------------
  const products = await Product.find(find)
    .sort({ position: "desc" })
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
  // console.log({ status, id });
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Update status successfully");

  // dùng back sẽ chuyển hướng yêu cầu trở lại ngay trang trước
  // Vì vậy nếu đang ở trang 2 thì nếu update status nó vẫn ở nguyên trang đó kaka
  res.redirect("back");
  // res.redirect('/admin/products')
};

// --------------------------/admin/change-multi--------------------------------------
module.exports.changeMulti = async (req, res) => {
  // console.log("req.body", req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  console.log({ type, ids });
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Update status successfully ${ids.length} products`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Update status successfully ${ids.length} products`);
      break;
    case "deleteAll":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: "true", deleteAt: new Date() }
      );
      req.flash("success", `Delete successfully ${ids.length} products`);
      break;
    case "change-position":
      console.log(ids);

      // Chỗ này phải dùng for of vì forEach không hỗ trợ async/await
      for (const element of ids) {
        // console.log(element);

        // Phải dùng biến let thì mới gán lại được giá trị cho position
        let [id, position] = element.split("-");
        position = Number(position);
        // console.log(id);
        // console.log(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash(
        "success",
        `Change position successfully ${ids.length} products`
      );
      break;
    // await Product.updateMany({ _id: { $in: ids } }, { deleted: "true" });

    default:
      break;
  }
  res.redirect("back");
  // res.send("ok")
};

// -----------------------------------[DELETE]: /admin/products/delete:id-------------------
module.exports.deleteItem = async (req, res) => {
  // console.log("req.params", req.params);
  const id = req.params.id;
  // console.log("id: ", id);
  // Xoá vĩnh viễn
  // await Product.deleteOne({ _id: id }, { deleted: "true" });
  // Xoá mềm
  await Product.updateOne(
    { _id: id },
    {
      deleted: "true",
      deleteAt: new Date(),
    }
  );
  req.flash("success", `Update products successfully `);
  res.redirect("back");
  // res.send("ok")
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Thêm mới một sản phẩm",
  });
};

module.exports.createUsePost = async (req, res) => {
  // console.log(req.file)
  // console.log("req.body:", req.body);
  // if(!req.body.title){
  //   req.flash("error", `Please enter the title`);
  //   res.redirect("back");
  //   return;
  // }
  req.body.price = Number(req.body.price);
  req.body.discountPercentage = Number(req.body.discountPercentage);
  req.body.stock = Number(req.body.stock);
  if (req.body.position == "") {
    const x = await Product.countDocuments();
    // console.log(x)
    req.body.position = x+1
  } else {
    req.body.position = Number(req.body.position);
   
  }
  if(req.file){
     req.body.thumbnail = `/uploads/${req.file.filename}`
  }
 
  const product = new Product(req.body);
  await product.save();
  req.flash("success", `Create products successfully `);
  res.redirect(`${systemconfig.prefixAdmin}/products`);
  // res.send("Create use post");
};
