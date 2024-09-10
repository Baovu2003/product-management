const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/product.controller")

router.get("/",controller.index);

router.get("/change-status/:status/:id", controller.changeStatus)



module.exports = router