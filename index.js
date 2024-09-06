const express = require("express");

require('dotenv').config();

const systemConfig = require("./config/system")

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

const database = require("./config/database")
database.connect();


const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");

// App Locals Variables:
// =>>tạo ra các biến toàn cục để ở file pug nào cũng có thể sử dụng

app.locals.prefixAdmin = systemConfig.prefixAdmin


app.use(express.static("public"));

route(app)
routeAdmin(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
