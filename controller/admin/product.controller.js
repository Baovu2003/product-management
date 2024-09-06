// [GET]: /admin/products

module.exports.index = (req, res) => {
    res.render("admin/pages/products/index.pug",{
      pageTitle:"Danh sách sản phẩm"
    });
    // res.send("Trang sản phẩm")
  }