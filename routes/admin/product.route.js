const express = require("express");
const router = express.Router();

const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() }); // Use the storage configuration

const controller = require("../../controller/admin/product.controller");
const validate = require("../../validate/admin/productvalidate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  controller.createUsePost
);

router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);
module.exports = router;
