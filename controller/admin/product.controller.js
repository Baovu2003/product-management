// [GET]: /admin/products

const Product = require("../../models/product.model")



module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false
  })
    res.render("admin/pages/products/index.pug",{
      pageTitle:"Danh sách sản phẩm",
      products: products
    });
    // res.send("Trang sản phẩm")
  }