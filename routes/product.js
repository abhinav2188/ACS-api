const router = require("express").Router();
const Service = require("../model/Service");
const db = require("../config/db");
const authorizeRequest = require("../middleware/authorize");
const Product = require("../model/Product");

//@desc get all products
router.get("/all", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else
      res.status(200).json({
        success: true,
        data: products,
      });
  });
});

//@desc fetch all products with service id
router.get("/:id", (req, res) => {
  Product.find({ service: req.params.id }, (err, products) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else
      res.status(200).json({
        success: true,
        data: products,
      });
  });
});

//@desc route to add product to a service
router.post(
  "/",
  authorizeRequest,
  db.upload.single("productImage"),
  (req, res) => {
    const body = req.body;
    const newProduct = new Product({
      name: body.productName,
      ISN: body.productISN,
      productImageUrl: req.file ? req.file.filename : "",
      DOI: body.dateOfImplementation,
      onDisplay: body.onDisplay,
      service: body.serviceId,
    });
    newProduct.save((err) => {
      if (!err) res.status(200).json({ success: true, created: newProduct });
      else res.status(400).json({ success: false, error: err.message });
    });
  }
);

//@desc delete a product
router.delete("/:id", authorizeRequest, (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) res.status(400).json({ success: false, error: err.message });
    else {
      if (!result)
        res.status(404).json({ success: false, error: "product not found" });
      else {
        res.status(200).json({
          success: true,
          deleted: result,
        });
      }
    }
  });
});

module.exports = router;
