const express = require("express");
const router = express.Router();

const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() }); // Use the storage configuration

const controller = require("../../controller/admin/product-category.controller");
const validate = require("../../validate/admin/productvalidate");

router.get("/", controller.index);
router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createUsePost
);

router.get("/edit/:id", controller.edit);
router.post(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editUsePost
);
router.get("/detail/:id", controller.detail);

router.delete("/delete/:id", controller.deleteItem);
module.exports = router;
