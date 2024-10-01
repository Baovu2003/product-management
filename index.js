const express = require("express");

// Flash
var flash = require("express-flash");
const cookieParser = require("cookie-parser")
const session = require("express-session")
// method-override là một middleware trong Express.js cho phép bạn ghi đè phương thức HTTP
// thông qua một tham số query hoặc một header.
// Điều này rất hữu ích khi bạn muốn gửi các phương thức HTTP
// Vì form html chỉ hỗ trợ phương thức GET và POST.
var methodOverride = require("method-override");

// ------Multer cho phép upload file ảnh-----------
const multer  = require('multer')
// ----------------End----------------------------
require("dotenv").config();

const systemConfig = require("./config/system");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));

// express đã tích hợp sẵn cái body-parser cho rồi
app.use(express.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);
// app.set("views", "./views");
app.set("view engine", "pug");

//Flash
app.use(cookieParser("VLBVYNTTT"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End flash

/* ------New Route to the TinyMCE Node module ---------*/

var path = require('path');
app.use('/tinymce',
   express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// ------------End TinyMCE --------------------


// App Locals Variables:
// =>>tạo ra các biến toàn cục để ở file pug nào cũng có thể sử dụng
// Ví dụ: Đã đc thêm vào admin/partials/header.pug và  admin/partials/sider.pug
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

// app.use(express.static("public"))
console.log("(__dirname:",__dirname);

route(app);


routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
