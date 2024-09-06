// [GET]: /admin/dashboard

module.exports.dashboard = (req, res) => {
    // res.send("Trang tổng quan")
    res.render("admin/pages/dashboard/index.pug",{
      pageTitle:"Trang tổng quan"
    });
  }